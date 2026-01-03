(function () {
  const codingActivitiesWebServiceUrl =
    'https://wakatime.com/share/@MBagrat/19a2f6d4-0350-4329-8c80-8417097cd249.json';
  const languageActivitiesWebServiceUrl =
    'https://wakatime.com/share/@MBagrat/235ce0e5-e1d0-494f-b59f-52fd129418b7.json';
  const editorActivitiesWebServiceUrl =
    'https://wakatime.com/share/@MBagrat/d34e84f0-6496-4e29-a36b-0331f3e420d9.json';
  const operationSystemsWebServiceUrl =
    'https://wakatime.com/share/@MBagrat/edab0ab6-2409-4e04-abc1-9514252cf98b.json';
  const categoriesWebServiceUrl =
    'https://wakatime.com/share/@MBagrat/0ba05cb6-dd8d-4c2c-b761-653412a2d04a.json';

  const ajaxService = (webServiceUrl, callback) => {
    var ajaxOptions = {
      url: webServiceUrl,
      type: 'GET',
      dataType: 'jsonp',
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
      'rgb(' +
      parseInt(aRgbHex[0], 16) +
      ',' +
      parseInt(aRgbHex[1], 16) +
      ',' +
      parseInt(aRgbHex[2], 16) +
      ',' +
      0.2 +
      ')'
    );
  }

  function chartServiceDrawBar(responseData, elementId) {
    let rowData = [];

    responseData.forEach((responseData) => {
      rowData.push({
        x: responseData.range.date,
        y: responseData.grand_total.digital,
      });
    });

    const data = {
      datasets: [
        {
          label: 'Coding Activity',
          data: rowData,
          backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };
    const config = {
      type: 'bar',
      data,
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'MM/dd/yyyy',
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
                hour: 'HH:mm',
              },
              tooltipFormat: 'HH:mm',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
    const barChart = new Chart(document.getElementById(elementId), config);
  }

  function chartServiceDrawDonate(responseData, elementId) {
    let colors = [];
    let presents = [];
    let labels = [];
    let rgbColors = [];

    responseData.forEach((data) => {
      if (
        !data.color ||
        typeof data.color !== 'string' ||
        !data.color.startsWith('#') ||
        data.color.length < 7
      ) {
        data.color =
          '#' +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
      }
      colors.push(data.color);
      presents.push(data.percent);
      labels.push(data.name);
      rgbColors.push(convertHexToRgb(data.color));
    });

    const data = {
      labels: labels,
      datasets: [
        {
          data: presents,
          borderColor: colors,
          backgroundColor: rgbColors,
          borderWidth: 2,
        },
      ],
    };
    const config = {
      type: 'doughnut',
      data,
      options: {
        // maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
        },
      },
    };
    const donateChart = new Chart(document.getElementById(elementId), config);
  }

  let codingActivitiesCallback = (data) => chartServiceDrawBar(data, 'codingActivitiesBar');
  let languageActivitiesCallback = (data) =>
    chartServiceDrawDonate(data, 'languageActivitiesChart');
  let editorActivitiesCallback = (data) => chartServiceDrawDonate(data, 'editorActivitiesChart');
  let operationSystemsCallback = (data) => chartServiceDrawDonate(data, 'operationSystemsChart');
  let categoriesCallback = (data) => chartServiceDrawDonate(data, 'categoriesChart');

  ajaxService(codingActivitiesWebServiceUrl, codingActivitiesCallback);
  ajaxService(languageActivitiesWebServiceUrl, languageActivitiesCallback);
  ajaxService(editorActivitiesWebServiceUrl, editorActivitiesCallback);
  ajaxService(operationSystemsWebServiceUrl, operationSystemsCallback);
  ajaxService(categoriesWebServiceUrl, categoriesCallback);
})();
