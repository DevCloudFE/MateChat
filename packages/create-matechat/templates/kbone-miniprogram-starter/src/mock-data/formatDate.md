在 JavaScript 中，格式化时间通常可以通过 `Date` 对象结合字符串拼接或 `Intl.DateTimeFormat` 实现。以下是几种常见的格式化方式：

---

### **1. 手动拼接格式化（简单灵活）**

```javascript
function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // 格式示例：2024-07-15 14:30:45
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const now = new Date()
console.log(formatDate(now)) // 输出当前时间，如 "2024-07-15 14:30:45"
```

---

### **2. 使用 `toLocaleString`（本地化格式）**

```javascript
const now = new Date()

// 格式示例：2024/7/15 下午2:30:45（根据系统语言）
console.log(now.toLocaleString())

// 指定格式（中文）
console.log(
  now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24小时制
  })
)
// 输出：2024/07/15 14:30:45
```

---

### **3. 使用 `Intl.DateTimeFormat`（推荐，支持复杂本地化）**

```javascript
const formatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

const now = new Date()
console.log(formatter.format(now)) // 输出：2024/07/15 14:30:45
```

---

### **4. 使用第三方库（如 `moment.js` 或 `day.js`）**

如果项目允许，可以使用轻量级的 `day.js`：

```javascript
// 安装：npm install dayjs
const dayjs = require('dayjs')

console.log(dayjs().format('YYYY-MM-DD HH:mm:ss')) // 输出：2024-07-15 14:30:45
```

---

### **5. 时间戳转格式化时间**

```javascript
const timestamp = 1721034645000 // 时间戳（毫秒）
const date = new Date(timestamp)
console.log(date.toISOString()) // ISO格式：2024-07-15T06:30:45.000Z
```

---

### **总结**

- **简单需求**：手动拼接或 `toLocaleString`。
- **复杂本地化**：`Intl.DateTimeFormat`。
- **项目中使用**：推荐 `day.js`（轻量且 API 友好）。
