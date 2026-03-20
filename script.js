const subareasByArea = {
    'artes': [
        'Artes plásticas y visuales', 'Diseño', 'Estudios culturales',
        'Filosofía', 'Historia y geografía', 'Lengua y literatura españolas',
        'Lenguas y literaturas clásicas', 'Lenguas extranjeras',
        'Documentación e información'
    ],
    'ciencias': [
        'Matemáticas', 'Estadística', 'Física',
        'Química', 'Biología', 'Ciencias ambientales y de la Tierra'
    ],
    'salud': [
        'Medicina', 'Enfermería', 'Farmacia', 'Odontología',
        'Fisioterapia', 'Nutrición', 'Óptica', 'Podología',
        'Veterinaria', 'Psicología', 'Ciencias de la actividad física y del deporte'
    ],
    'sociales': [
        'Derecho y ciencias jurídicas', 'Economía y empresa', 'Ciencias políticas',
        'Estudios sociales', 'Educación', 'Comunicación y medios', 'Turismo y ocio'
    ],
    'ingenieria': [
        'Biotecnología', 'Informática', 'Telecomunicaciones', 
        'Ingeniería electrónica, automática y robótica', 'Ingeniería eléctrica', 
        'Ingeniería mecánica e industrial', 'Ingeniería química', 
        'Ingeniería civil y de construcción', 
        'Ingeniería agrícola, forestal y del medio natural',
        'Ingeniería aeroespacial y aeronáutica', 'Ingeniería minera', 
        'Arquitectura y urbanismo'
    ]
}

document.addEventListener('DOMContentLoaded', function() {

    fetch('data/degrees.json')
    .then(function(response) { return response.json() })
    .then(function(degrees) {

        populateDatalist(degrees)
        showDegrees(degrees)

        document.getElementById('searchInput').addEventListener('input', function() {
            const text = this.value.toLowerCase()
            const filtered = degrees.filter(function(degree) {
                return degree.name.toLowerCase().includes(text)
            })
            showDegrees(filtered)
        })
    })
})

document.querySelectorAll('.area_checkbox').forEach(function(checkbox) {
    checkbox.addEventListener('change', updateSubareas)
})

function populateDatalist(degrees) {
    const datalist = document.getElementById('degreesTitles')

    degrees.forEach(function(degree) {
        const option = document.createElement('option')
        option.value = degree.name
        datalist.appendChild(option)
    })
}

function updateSubareas() {
    const checkedAreas = document.querySelectorAll('.area_checkbox:checked')
    const subareaContainer = document.getElementById('subareaGroup')

    let allSubareas = []
    checkedAreas.forEach(function(checkbox) {
        const key = checkbox.dataset.area
        if (subareasByArea[key]) {
            allSubareas = allSubareas.concat(subareasByArea[key])
        }
    })

    if (allSubareas.length === 0) {
        subareaContainer.style.maxHeight = '0'
        subareaContainer.style.opacity = '0'
        subareaContainer.innerHTML = ''
        return
    }

    subareaContainer.innerHTML = '<label class="group_label">Subáreas (puede seleccionar una o más)</label><div class="toggle_group" id="subareaToggleGroup"></div>'
    const toggleGroup = document.getElementById('subareaToggleGroup')

    allSubareas.forEach(function(subarea) {
        const label = document.createElement('label')
        label.className = 'toggle_button'
        label.innerHTML = `
        <input type="checkbox" name="subarea" value="${subarea.toLowerCase()}">
        <span>${subarea}</span>
        `
        toggleGroup.appendChild(label)
    })

    subareaContainer.style.maxHeight = '400px'
    subareaContainer.style.opacity = '1'
}

function showDegrees(degrees) {
    const container = document.getElementById('degreeList')
    container.innerHTML = ''

    degrees.forEach(function(degree) {
        const article = document.createElement('article')
        article.className = 'degree-card'
        article.innerHTML = `
            <h2>${degree.name}</h2>
            <span class="field">${degree.field}</span>
            <p class="evau">Nota de corte: <strong>${degree.evau}</strong></p>
            <p>${degree.description}</p>
        `
        article.addEventListener('click', function() {
            window.location.href = `degree.html?id=${degree.id}`
        })
        container.appendChild(article)
    })
}