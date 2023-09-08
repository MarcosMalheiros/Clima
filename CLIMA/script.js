// Função para buscar a chave da API do servidor PHP
const fetchApiKey = async () => {
  try {
    const response = await fetch('api.php'); 
    const data = await response.json();

    if (data.apiKey) {
      return data.apiKey;
    } else {
      throw new Error('Chave da API não encontrada.');
    }
  } catch (error) {
    console.error('Erro ao obter a chave da API:', error);
    return null;
  }
};


const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// funcoes 

const getWeatherData = async (city, apiKey) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  try {
    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
    return null;
  }
};

const showWeatherData = async (city) => {
  const apiKey = await fetchApiKey();

  if (!apiKey) {
    console.error('Chave da API não disponível.');
    return;
  }

  const data = await getWeatherData(city, apiKey); // Passar apiKey como argumento

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  countryElement.setAttribute("src", `https://www.countryflagicons.com/FLAT/48/${data.sys.country}.png`);
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}KM/H`;

  weatherContainer.classList.remove("hide");
};

// Resto do código...


// Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {

  if(e.code === "Enter") {
    const city = e.target.value

    showWeatherData(city);
  }

})



  // ...
  
  // Evento de clique no botão de pesquisa
  searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
  
    const city = cityInput.value;
  
    // Buscar a chave de API primeiro
    const apiKey = await fetchApiKey();
  
    if (!apiKey) {
      console.error('Chave da API não disponível.');
      return;
    }
  
    showWeatherData(city, apiKey);
  });
  
  // Evento de pressionar Enter no campo de entrada da cidade
  cityInput.addEventListener('keyup', async (e) => {
    if (e.code === 'Enter') {
      const city = e.target.value;
  
      // Buscar a chave de API primeiro
      const apiKey = await fetchApiKey();
  
      if (!apiKey) {
        console.error('Chave da API não disponível.');
        return;
      }
  
      showWeatherData(city, apiKey);
    }
  });
  