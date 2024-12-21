export const FETCHDATA = async (
  page = 0,
  size = 5,
  totalPageSize = 0,
  category = "all"
) => {
  const url = `http://localhost:8080/til/items?page=${page}&size=${size}&currentTotalPage=${totalPageSize}&category=${category}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json(); // JSON 응답을 파싱
    return data; // 데이터를 반환
  } catch (error) {
    console.error("There was an error fetching the data!", error);
  }
};

export const SAVEDATA = async (newFact) => {
  try {
    const response = await fetch("http://localhost:8080/til/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFact), // 서버에 보낼 데이터
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json(); // JSON 응답을 파싱
    return data; // 데이터를 반환
  } catch (error) {
    console.error("There was an error posting the data!", error);
  }
};

export const UPDATEDATA = (id, key, data) => {
  // key와 data를 객체 형식으로 묶어보냄
  const requestData = {
    [key]: data, // key를 속성명으로, data를 값으로 설정
  };

  fetch(`http://localhost:8080/til/item?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData), // 객체를 JSON으로 변환하여 body로 전송
  }).catch((error) => {
    console.error("There was an error posting the data!", error);
  });
};

export const DELETEDATA = (id, setFacts) => {
  // DELETE 요청을 보내는 fetch
  fetch(`http://localhost:8080/til/item?id=${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Item deleted successfully");
        setFacts((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        console.error("Failed to delete item");
      }
    })
    .catch((error) => {
      console.error("Error during fetch:", error);
    });
};
