import axios from "axios";

// 문의 글 전체 불러오기
export async function getInquiries() {
  try {
    const res = await axios.get("/api/user/getInquiriesAll");

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching feed data:", error);
    return [];
  }
}

// 문의 글 index 불러오기
export async function getInquiriesID(id: number) {
  try {
    const res = await axios.get(`/api/user/getInquiriesAll/${id}`);

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching feed data:", error);
    return [];
  }
}

// 문의 하기
export async function postInquiry(text: string) {
  const res = await axios.post(`/api/user/postInquiry`, {
    content_text: text,
  });

  if (res.status === 200) {
    // return res.data.data;
  }
}

// 문의 수정
export async function editInquiry(text: string, id: number) {
  try {
    const res = await axios.put(`/api/user/editInquiry/${id}`, {
      content_text: text,
      id: id,
    });
  } catch (error) {
    console.error("Error fetching feed data:", error);
    return [];
  }
}

// 문의 삭제
export async function deleteInquiryApi(id: number) {
  try {
    const res = await axios.delete(`/api/user/deleteInquiry`, {
      data: { id },
    });

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching feed data:", error);
    return [];
  }
}
