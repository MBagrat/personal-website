const codingActivitiesWebServiceUrl =
  "https://wakatime.com/share/@be3a3e41-13fd-45af-9359-ab80bf63e454/2746108e-8778-4734-ae6c-b1cf104be4fd.json";
const languageActivitiesWebServiceUrl =
  "https://wakatime.com/share/@be3a3e41-13fd-45af-9359-ab80bf63e454/3874410e-cd32-4a90-a573-10a6ca9ba517.json";
const editorActivitiesWebServiceUrl =
  "https://wakatime.com/share/@be3a3e41-13fd-45af-9359-ab80bf63e454/a855fc73-361e-4af6-90c4-17207fd0e510.json";
const operationSystemsWebServiceUrl =
  "https://wakatime.com/share/@be3a3e41-13fd-45af-9359-ab80bf63e454/a0879f8d-6364-4b52-89a7-46d1cfe75661.json";
const categoriesWebServiceUrl =
  "https://wakatime.com/share/@be3a3e41-13fd-45af-9359-ab80bf63e454/90df41c7-076a-45bb-9620-ed2e36fd32be.json";

const ajaxService = (webServiceUrl, callback) => {
  var ajaxOptions = {
    url: webServiceUrl,
    type: "GET",
    dataType: "jsonp",
    success: function (response) {
      callback(response.data);
    },
  };
  $.ajax(ajaxOptions);
};

function convertHexToRgb(color) {
  let colour;
  if (color.charAt(0) === '#') {
    colour = color.substring(1);
  }
  const aRgbHex = colour.match(/.{1,2}/g);
  return (
    "rgb("
    + parseInt(aRgbHex[0], 16) + ","
    + parseInt(aRgbHex[1], 16) + ","
    + parseInt(aRgbHex[2], 16) + ","
    + 0.2 +
    ")"
  );
}

function chartServiceDrawBar(responseData, elementId) {
  let rowData = [];

  responseData.forEach(responseData => {
    rowData.push({
      x: responseData.range.date,
      y: responseData.grand_total.digital,
    });
  });

  const data = {
    datasets: [{
      label: 'Coding Activity',
      data: rowData,
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)'
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)'
      ],
      borderWidth: 2
    },
    ],
  };
  const config = {
    type: "bar",
    data,
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'MM/dd/yyyy'
          },
        },
        y: {
          type: 'time',
          min: () => new Date().setHours(0, 0, 0, 0),
          max: () => new Date().setHours(12, 0, 0, 0),
          time: {
            parser: 'HH:mm',
            unit: 'hour',
            displayFormats: {
              hour: 'HH:mm'
            },
            tooltipFormat: 'HH:mm'
          },
        }
      },
      plugins: {
        legend: {
          display: false
        }
      },
    }
  };
  const barChart = new Chart(document.getElementById(elementId), config)
}

function chartServiceDrawDonate(responseData, elementId) {
  let colors = [];
  let presents = [];
  let labels = [];
  let rgbColors = [];

  responseData.forEach(data => {
    colors.push(data.color);
    presents.push(data.percent);
    labels.push(data.name);
    rgbColors.push(convertHexToRgb(data.color));
  });

  const data = {
    labels: labels,
    datasets: [{
      data: presents,
      borderColor: colors,
      backgroundColor: rgbColors,
      borderWidth: 2,
    },
    ],
  };
  const config = {
    type: "doughnut",
    data,
    options: {
      // maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        }
      },
    }
  };
  const donateChart = new Chart(document.getElementById(elementId), config)
}

let codingActivitiesCallback = (data) => chartServiceDrawBar(data, "codingActivitiesBar");
let languageActivitiesCallback = (data) => chartServiceDrawDonate(data, "languageActivitiesChart");
let editorActivitiesCallback = (data) => chartServiceDrawDonate(data, "editorActivitiesChart");
let operationSystemsCallback = (data) => chartServiceDrawDonate(data, "operationSystemsChart");
let categoriesCallback = (data) => chartServiceDrawDonate(data, "categoriesChart");

ajaxService(codingActivitiesWebServiceUrl, codingActivitiesCallback);
ajaxService(languageActivitiesWebServiceUrl, languageActivitiesCallback);
ajaxService(editorActivitiesWebServiceUrl, editorActivitiesCallback);
ajaxService(operationSystemsWebServiceUrl, operationSystemsCallback);
ajaxService(categoriesWebServiceUrl, categoriesCallback);
