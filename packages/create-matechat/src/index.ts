import { existsSync, readFileSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { type Context, defineCommand, run, select } from 'archons';
import chalk from 'chalk';
import { templates } from './template';

const cwd = process.cwd();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function isValidProjectName(name: string) {
  return /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name);
}

const main = defineCommand({
  meta: {
    name: 'create-matechat',
    about: 'DevCloudFE MateChat Command-line Tool',
    version: JSON.parse(
      readFileSync(path.join(__dirname, '../package.json'), 'utf-8'),
    ).version,
    styled: true,
  },
  options: {
    name: {
      type: 'positional',
      help: 'The name of the project',
    },
    clean: {
      type: 'option',
      parser: 'boolean',
      short: 'c',
      help: 'Clean the directory if it exists',
      default: 'false',
    },
    template: {
      type: 'option',
      short: 't',
      help: 'The template of the project',
    },
  },
  callback: async (ctx: Context) => {
    let projectName = ctx.args.name;

    while (true) {
      projectName ||= ctx.ask('Please input the project name:', {
        initialValue: projectName,
        placeholder: 'matechat-project',
      });
      if (!isValidProjectName(projectName)) {
        console.log(
          chalk.red(
            `Invalid project name ${chalk.redBright(projectName)}, please try again.`,
          ),
        );
        projectName = '';
        continue;
      }
      if (existsSync(path.join(cwd, projectName))) {
        const clean =
          ctx.args.clean ||
          ctx.confirm('The project already exists, do you want to continue?', {
            default: false,
          });
        if (clean) {
          const spinner = ctx.createSpinner();
          spinner.setMessage('Cleaning existed directory...');
          await fs.rm(path.join(cwd, projectName), { recursive: true });
          spinner.finishWithMessage('Directory cleaned.');
        } else {
          console.log(
            chalk.red(
              `The project ${chalk.redBright(
                projectName,
              )} already exists, please try again.`,
            ),
          );
          return;
        }
      }
      break;
    }
    if (templates.length === 0) {
      console.log(
        chalk.red(`No template found, this is mostly like a MateChat internal issue,
create a new issue at https://gitcode.com/DevCloudFE/MateChat/issues`),
      );
      return;
    }
    let template = ctx.args.template;
    if (template && !templates.some((t) => t.name === template)) {
      console.log(
        chalk.red(
          `Invalid template ${chalk.redBright(template)}, please try again.`,
        ),
      );
      return;
    }
    if (!template) {
      template = select(
        'Please select the template:',
        templates.map((t) => t.name),
      );
      template = 'Vue Starter';
    }

    const templateSources = templates.find((t) => t.name === template)?.sources;
    if (
      !templateSources ||
      !templateSources.every((src) => existsSync(src.from))
    ) {
      console.log(
        chalk.red(
          `Invalid template ${chalk.redBright(template)}, please try again.`,
        ),
      );
      return;
    }
    console.log(
      chalk.greenBright(
        `Creating project ${chalk.greenBright(projectName)} with template ${chalk.greenBright(template)}...`,
      ),
    );
    const targetPath = path.join(cwd, projectName);
    const spinner = ctx.createSpinner();
    spinner.setMessage('Copying template files...');
    await Promise.all(
      templateSources.map((src) =>
        fs.cp(src.from, path.join(targetPath, src.to), {
          recursive: true,
          force: true,
          errorOnExist: false,
        }),
      ),
    )
      .then(async () => {
        spinner.finishWithMessage('Template files copied.');
        const gitignorePath = path.join(targetPath, 'gitignore');
        return (
          existsSync(gitignorePath) &&
          fs.rename(gitignorePath, path.join(targetPath, '.gitignore'))
        );
      })
      .catch((err) => {
        spinner.finishWithMessage(
          `Failed to copy template files: ${chalk.redBright(err.message)}`,
        );
        return;
      });
    console.log(
      chalk.greenBright(
        `Project ${chalk.yellowBright(projectName)} created successfully!`,
      ),
    );
    console.log(
      chalk.blueBright(
        `You can now run ${chalk.bold(
          `cd ${projectName} && pnpm install && pnpm dev`,
        )} to start your project.`,
      ),
    );
  },
});

run(main);
