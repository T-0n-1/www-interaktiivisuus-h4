let dataSet = []
let breeds = []
let breedCount = []

db.collection("dogsinfi").onSnapshot(response => {
    response.docChanges().forEach(change => {
        var doc = {
            ...change.doc.data(),
            id: change.doc.id
        }
        var index = dataSet.findIndex(item => item.id == doc.id)   // Using ternary operator instead of switch-case
        change.type == 'added' ? dataSet.push(doc) : (change.type == 'modified' ? dataSet[index] = doc : dataSet = dataSet.filter(item => item.id !== doc.id))
    })
    
    dataSet.sort((a, b) => parseFloat(b.count) - parseFloat(a.count))
    dataSet.forEach(item => {
        breeds.push(item.breed)
        breedCount.push(item.count)
    })
    
    const data = {
        labels: breeds,
        datasets: [{
            label: 'Dogs in Finland',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: breedCount
        }]
    }
    
    const config = {
        type: 'bar',
        data,
        options: {}
    }
    
    var myChart = new Chart(
        document.getElementById('myChart'),
        config
        )
})