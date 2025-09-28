import React, { useState } from 'react'
import * as XLSX from 'xlsx'


export default function UploadExcelToJson({ onJson }) {
  const [fileName, setFileName] = useState('')
  const [sheets, setSheets] = useState([])
  const [selectedSheet, setSelectedSheet] = useState('')
  const [jsonData, setJsonData] = useState(null)
  const [hasHeader, setHasHeader] = useState(true)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)

    // read file as ArrayBuffer (works for xlsx/xls)
    const arrayBuffer = await file.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })

    // list sheet names
    setSheets(workbook.SheetNames)
    setSelectedSheet(workbook.SheetNames[0])

    // convert the first sheet by default
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const raw = XLSX.utils.sheet_to_json(sheet, { header: hasHeader ? 0 : 1, defval: null })
    const parsed = normalizeJson(raw, hasHeader)
    setJsonData(parsed)
  
        
  }

  // When user changes sheet selection
  async function handleSheetChange(e) {
    const name = e.target.value
    setSelectedSheet(name)
    const input = document.getElementById('excelInput')
    if (!input?.files?.[0]) return
    const file = input.files[0]
    const arrayBuffer = await file.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })
    const sheet = workbook.Sheets[name]
    const raw = XLSX.utils.sheet_to_json(sheet, { header: hasHeader ? 0 : 1, defval: null })
    const parsed = normalizeJson(raw, hasHeader)
    setJsonData(parsed)
    if (onJson) onJson(parsed)
  }

  function normalizeJson(raw, headerPresent) {
    // If headerPresent true, sheet_to_json already returns objects keyed by header
    if (headerPresent) return raw

    // When no header row, sheet_to_json returns arrays per row -> convert to objects with col0, col1...
    return raw.map((rowArr) => {
      const obj = {}
      rowArr.forEach((val, idx) => {
        obj[`col${idx}`] = val
      })
      return obj
    })
  }

  function downloadJson() {
    if (!jsonData) return
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (fileName || 'data') + '.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function sendToServer(url = '/api/upload-json') {
    if (!jsonData) return
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: jsonData }),
      })
      if (!res.ok) throw new Error(await res.text())
      alert('Uploaded successfully')
    } catch (err) {
      alert('Upload failed: ' + err.message)
    }
  }

  return (
    <div className="p-4 max-w-2xl mx-auto border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Upload Excel / CSV → JSON</h3>

      <input id="excelInput" type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="mb-3" />

      <div className="flex items-center gap-3 mb-3">
        <label className="inline-flex items-center">
          <input type="checkbox" checked={hasHeader} onChange={() => setHasHeader((s) => !s)} />
          <span className="ml-2">Sheet has header row</span>
        </label>
      </div>

      {sheets.length > 0 && (
        <div className="mb-3">
          <label className="block text-sm mb-1">Select sheet</label>
          <select value={selectedSheet} onChange={handleSheetChange} className="border rounded p-1">
            {sheets.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex gap-2 mb-3">
        <button onClick={downloadJson} className="px-3 py-1 rounded border">Download JSON</button>
        <button onClick={() => navigator.clipboard?.writeText(JSON.stringify(jsonData, null, 2))} className="px-3 py-1 rounded border" disabled={!jsonData}>
          Copy JSON
        </button>
        <button onClick={() => sendToServer()} className="px-3 py-1 rounded border" disabled={!jsonData}>
          Send to server
        </button>
      </div>

      <div className="mb-2 text-sm text-slate-600">Preview (first 10 rows):</div>
      <pre className="max-h-64 overflow-auto bg-slate-50 p-3 border rounded text-xs">{jsonData ? JSON.stringify(jsonData.slice(0,20), null, 2) : 'No data yet'}</pre>
    </div>
  )
}

/*
Notes and tips:
1. Install SheetJS: npm install xlsx
2. Works fully on the client — no server needed unless you want to persist the JSON.
3. For very large spreadsheets consider parsing on server-side or using streaming approaches.
4. If your Excel columns contain complex types (dates, formulas) you may need to post-process cell values.
*/
