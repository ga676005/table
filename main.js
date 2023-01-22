import { createJSONPlaceholderTable } from "./myTables.js"

const container = document.querySelector('.container')
const jsonPlaceholderTable = createJSONPlaceholderTable()

container.appendChild(jsonPlaceholderTable)

