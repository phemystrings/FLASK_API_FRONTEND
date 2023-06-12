export const baseURL = 'http://localhost:5000'

export const dataTable = async (tbody) => {
    try {
        const res = await fetch(baseURL)
        const data = await res.json()

        if (!data.length) throw Error()
        data.map(rw => {
            const row = document.createElement('tr')
            const { id, ...obj } = rw
            Object.values(obj).forEach(a_2 => {
                const td = document.createElement('td')
                td.textContent = a_2; row.appendChild(td)
            })
            const td_1 = document.createElement('td')

            td_1.innerHTML = `<a href='/views/update.html?${id}'>Edit</a> 
                 <a href='/views/details.html?${id}'>Details</a>`
            row.appendChild(td_1); tbody.appendChild(row)
        })
    } catch (err) {
        const row_1 = document.createElement('tr'); row_1.className = 'no-data'
        const td_2 = document.createElement('td'); td_2.colSpan = '5'
        td_2.textContent = err.name ? 'URL NOT FOUND' : 'NO DATA TO DISPLAY'
        row_1.appendChild(td_2); tbody.appendChild(row_1)
    }
}