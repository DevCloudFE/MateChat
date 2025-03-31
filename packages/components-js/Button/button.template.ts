import { sendIcon } from "./SendIcon.svg";

export const buttonTemplate = `
  <div class="mc-button">
    <div class="mc-button-icon">
      ${sendIcon}
    </div>
    <div mc-if="showIcon" class="mc-button-content">{{label}}</div>
    <div class="native-slot"  data-slot="expand"></div>
    <div mc-for="item in list" class="item">{{item}}</div>
  </div>
`;
