import { baseURL } from "./apiInstance.js"

export const create = async (form) => {
    await fetch(baseURL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
    })
    location.replace('/views/index.html')
}

export const update = async (data_id, form) => {
    await fetch(`${baseURL}/${data_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(form)
    })
    location.replace('/views/index.html')
}
const del = async (data_id) => {
    await fetch(`${baseURL}/${data_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    location.replace('/views/index.html')
}

export const get_One = async (data_id, ul) => {
    const res = await fetch(`${baseURL}/${data_id}`)

    if (ul) {
        const { id, firstname, lastname, ...obj } = await res.json(),
            data = { fullName: `${firstname} ${lastname}`, ...obj }
        Object.values(data).forEach(a => {
            const li = document.createElement('li')
            li.textContent = a; ul.appendChild(li)
        })
        const anc_1 = document.createElement('a')
        anc_1.href = `/views/update.html?${id}`, anc_1.textContent = 'Edit'
        anc_1.style.marginRight = '0.5rem'
        ul.nextElementSibling.appendChild(anc_1)
        const anc_2 = document.createElement('a')
        anc_2.href = '#', anc_2.textContent = 'Delete'
        anc_2.onclick = () => del(id)
        ul.nextElementSibling.appendChild(anc_2)
    }
    else return await res.json()
}