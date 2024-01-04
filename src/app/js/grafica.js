// Datos de ejemplo para la gráfica
var data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [{
        label: "Ventas",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        data: [65, 59, 80, 81, 56]
    }]
};

// Configuración de la gráfica
var options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

// Crear la gráfica de barras
var ctx = document.getElementById('barChart').getContext('2d');
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});
