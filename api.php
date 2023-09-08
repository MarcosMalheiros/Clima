<?php

// Busca a chave da API de variáveis de ambiente ou defina no código
$api_key = getenv('API_KEY');

// Retorna a chave da API em JSON
echo json_encode(['apiKey' => $api_key]);
?>
