<?php

$host = "localhost";
$user = "root";
$password = "#Piyush02";
$dbname = "nautankinights";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
  http_response_code(500);
  die(json_encode(["message" => "MySQL Connection Failed", "error" => $conn->connect_error]));
}
?>
