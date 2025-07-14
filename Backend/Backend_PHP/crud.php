<?php
include 'db.php';
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = str_replace("/Backend/api/index.php", "/api", $uri);

$input = json_decode(file_get_contents("php://input"), true);

function extractId($uri) {
  preg_match("#^/api/event/(\d+)$#", $uri, $matches);
  return $matches[1] ?? null;
}

switch (true) {
  case $method === 'POST' && $uri === '/api/events':
    $stmt = $conn->prepare("INSERT INTO event1 (title, description, city, address, date, start_time, end_time, category, organizer_name, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssss", $input['title'], $input['description'], $input['city'], $input['address'], $input['date'], $input['start_time'], $input['end_time'], $input['category'], $input['organizer_name'], $input['image_url']);
    echo $stmt->execute() ? json_encode(["message" => "Event created successfully"]) : json_encode(["message" => "Insert failed", "error" => $stmt->error]);
    break;

  case $method === 'GET' && strpos($uri, '/api/events') === 0:
    $sql = "SELECT * FROM event1 where 1=1";
    $params = [];
    $types = "";

    foreach (['city', 'category', 'date'] as $filter) {
      if (isset($_GET[$filter])) {
        $sql .= " AND $filter = ?";
        $params[] = $_GET[$filter];
        $types .= "s";
      }
    }

    $sql .= " ORDER BY date ASC";
    $stmt = $conn->prepare($sql);
    if ($params) $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    break;

  case $method === 'GET' && $uri === '/api/cities':
    $result = $conn->query("SELECT DISTINCT city FROM event1 ORDER BY city");
    $cities = [];
    while ($row = $result->fetch_assoc()) $cities[] = $row['city'];
    echo json_encode($cities);
    break;

  case $method === 'GET' && $uri === '/api/categories':
    $result = $conn->query("SELECT DISTINCT category FROM event1 ORDER BY category");
    $categories = [];
    while ($row = $result->fetch_assoc()) $categories[] = $row['category'];
    echo json_encode($categories);
    break;

  case $method === 'GET' && preg_match("#^/api/event/\d+$#", $uri):
    $id = extractId($uri);
    $stmt = $conn->prepare("SELECT * FROM event1 WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    echo $result ? json_encode($result) : http_response_code(404);
    break;

  case $method === 'PUT' && preg_match("#^/api/event/\d+$#", $uri):
    $id = extractId($uri);
    $required = ['title','description','city','address','date','start_time','end_time','category','organizer_name','image_url'];
    if (array_diff($required, array_keys($input))) {
      echo json_encode(["message" => "All fields are required"]);
      break;
    }
    $stmt = $conn->prepare("UPDATE event1 SET title=?, description=?, city=?, address=?, date=?, start_time=?, end_time=?, category=?, organizer_name=?, image_url=? WHERE id=?");
    $stmt->bind_param("ssssssssssi", $input['title'], $input['description'], $input['city'], $input['address'], $input['date'], $input['start_time'], $input['end_time'], $input['category'], $input['organizer_name'], $input['image_url'], $id);
    echo $stmt->execute() ? json_encode(["message" => "Event fully updated"]) : json_encode(["message" => "Update failed", "error" => $stmt->error]);
    break;

  case $method === 'PATCH' && preg_match("#^/api/event/\d+$#", $uri):
    $id = extractId($uri);
    if (!$input) {
      echo json_encode(["message" => "No data to update"]);
      break;
    }
    $allowed = ['title','description','city','address','date','start_time','end_time','category','organizer_name','image_url'];
    $updates = [];
    $values = [];
    $types = "";
    foreach ($allowed as $key) {
      if (isset($input[$key])) {
        $updates[] = "$key = ?";
        $values[] = $input[$key];
        $types .= "s";
      }
    }
    if (!$updates) {
      echo json_encode(["message" => "Invalid fields"]);
      break;
    }
    $values[] = $id;
    $types .= "i";
    $sql = "UPDATE event1 SET " . implode(", ", $updates) . " WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$values);
    echo $stmt->execute() ? json_encode(["message" => "Event updated successfully"]) : json_encode(["message" => "Update failed", "error" => $stmt->error]);
    break;

  case $method === 'DELETE' && preg_match("#^/api/event/\d+$#", $uri):
    $id = extractId($uri);
    $stmt = $conn->prepare("DELETE FROM event1 WHERE id = ?");
    $stmt->bind_param("i", $id);
    echo $stmt->execute() ? json_encode(["message" => "Event deleted"]) : json_encode(["message" => "Delete failed", "error" => $stmt->error]);
    break;

  default:
    http_response_code(404);
    echo json_encode(["message" => "Route not found"]);
    break;
}

$conn->close();
?>
