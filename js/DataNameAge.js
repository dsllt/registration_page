export class DataNameAge {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@NameAgeData:')) || []
  }

  save() {
    localStorage.setItem('@NameAgeData:', JSON.stringify(this.entries))
  }

  add(inputData) {
    this.entries = [inputData, ...this.entries]
    this.update()
    this.save()
  }

  delete(nameAgeData) {
    const filteredEntries = this.entries.filter(
      entry => entry.id !== nameAgeData.id
    )
    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

export class DataNameAgeView extends DataNameAge {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onadd()
    this.sortInput()
    this.selectCategory()
    this.clearAll()
  }

  onadd() {
    const addBtn = this.root.querySelector('.inputBtn button')
    addBtn.onclick = () => {
      let name = this.root.querySelector('#nameBtn').value
      if (name == '') {
        alert('Digite um nome.')
        return
      }
      let age = this.root.querySelector('#ageBtn').value
      if (age == '') {
        alert('Defina uma idade.')
        return
      }
      let category = ''
      if (age <= 12) {
        category = 'Criança'
      } else if (12 < age && age <= 19) {
        category = 'Adolescente'
      } else if (19 < age && age <= 65) {
        category = 'Adulto'
      } else {
        category = 'Idoso'
      }

      let id = this.tbody.querySelectorAll('tr').length + 1

      let inputData = {}
      inputData.name = name
      inputData.age = age
      inputData.category = category
      inputData.id = id
      this.add(inputData)
      this.clearInputs()
    }
  }

  sortInput() {
    const sortBtn = this.root.querySelector('.dataOrder button')

    sortBtn.onclick = () => {
      let sortOpt = this.root.querySelector('#order').selectedIndex

      if (sortOpt == 0) {
        this.load()
      } else if (sortOpt == 1) {
        var sorted = this.entries.sort(function (a, b) {
          return a.age - b.age
        })
        this.entries = sorted
      } else if (sortOpt == 2) {
        this.entries.sort(function (a, b) {
          return b.age - a.age
        })
      } else if (sortOpt == 3) {
        this.entries.sort(function (a, b) {
          var nameA = a.name.toLowerCase()
          var nameB = b.name.toLowerCase()
          return nameA.localeCompare(nameB)
        })
      } else if (sortOpt == 4) {
        this.entries.sort(function (a, b) {
          var nameA = a.name.toLowerCase()
          var nameB = b.name.toLowerCase()
          return nameB.localeCompare(nameA)
        })
      } else if (sortOpt == 5) {
        this.entries.sort(function (a, b) {
          var nameA = a.name.toLowerCase()
          var nameB = b.name.toLowerCase()
          return a.age - b.age || nameA.localeCompare(nameB)
        })
      } else {
        this.entries.sort(function (a, b) {
          var nameA = a.name.toLowerCase()
          var nameB = b.name.toLowerCase()
          return b.age - a.age || nameB.localeCompare(nameA)
        })
      }

      this.update()
    }
  }

  selectCategory() {
    const selectBtn = this.root.querySelector('.dataCategory button')

    let sortedEntries = this.entries

    selectBtn.onclick = () => {
      let catOpt = this.root.querySelector('#ageCategory').selectedIndex

      if (catOpt == 0) {
        this.entries = sortedEntries
      } else if (catOpt == 1) {
        var catOne = sortedEntries.filter(function (a) {
          return a.category == 'Criança'
        })
        this.entries = catOne
      } else if (catOpt == 2) {
        var catTwo = sortedEntries.filter(function (a) {
          return a.category == 'Adolescente'
        })
        this.entries = catTwo
      } else if (catOpt == 3) {
        var catThree = sortedEntries.filter(function (a) {
          return a.category == 'Adulto'
        })
        this.entries = catThree
      } else {
        var catFour = sortedEntries.filter(function (a) {
          return a.category == 'Idoso'
        })
        this.entries = catFour
      }

      this.update()
    }
  }

  update() {
    this.removeAllTr()

    this.entries.forEach(nameAgeData => {
      const row = this.createRow()

      row.querySelector('.name').textContent = nameAgeData.name
      row.querySelector('.age').textContent = nameAgeData.age
      row.querySelector('.category').textContent = nameAgeData.category

      row.querySelector('.remove').onclick = () => {
        const confirmDel = confirm('Tem certeza que deseja deletar esse dado?')
        if (confirmDel) {
          this.delete(nameAgeData)
        }
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    const data = `
    <tr>
      <td class="name">Dayane</td>
      <td class="age">27</td>
      <td class="category">Adulto</td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `

    tr.innerHTML = data

    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    })
  }

  clearInputs() {
    this.root.querySelector('#nameBtn').value = ''
    this.root.querySelector('#ageBtn').value = ''
  }

  clearAll() {
    const clearBtn = this.root.querySelector('.clearAll button')
    clearBtn.onclick = () => {
      const confirmDel = confirm('Tem certeza que deseja deletar todos dados?')
      if (confirmDel) {
        this.entries = ''
        this.removeAllTr()
        this.save()
      }
    }

    this.update()
  }
}
