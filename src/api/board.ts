import axios from "axios";
import { redirect } from "next/navigation";

// 피드 목록 불러오기
export async function readPeedApi() {
  try {
    const res = await axios.get("/api/feed/getList");

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching feed data:", error);
    return [];
  }
}
// 피드 업로드 하기
export async function postPeed(youtubeId: string, tag: string) {
  try {
    // console.log("API 요청 데이터:", { youtube_link: youtubeId });
    const res = await axios.post("/api/feed/upload", {
      youtube_link: youtubeId,
      tag: tag,
    });
    console.log("API 응답:", res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    throw new Error("Failed to post feed data");
  }
}

// 피드 삭제하기
export async function deletePeedApi(id: number) {
  const res = await axios.delete("/api/feed/delete", {
    data: { id },
  });
}

// 피드 id 로 정보불러오기
export async function getFeedIDApi(id: number) {
  try {
    const res = await axios.get(`/api/feed/getList/${id}`);

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching feed data:", error);
    return [];
  }
}

// 피드 정보 수정
export async function editFeedIDApi(tag: object, id: number) {
  try {
    const res = await axios.put(`/api/feed/edit/${id}`, {
      tag: tag,
      id: id,
    });

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching feed data:", error);
    return [];
  }
}

// 피드 북마크 저장
export async function bookmarkFeedIDApi(id: number) {
  try {
    const res = await axios.post(`/api/user/bookmark/add`, {
      t_youtube_id: id,
    });

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching feed data:", error);
    return [];
  }
}

// 유저 북마크 전체 조회
export async function getBookmarkFeedApi() {
  try {
    const res = await axios.get(`/api/user/bookmark`);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching feed data:", error);
    return [];
  }
}

// 유저 북마크 id 조회
export async function getBookmarkFeedIDApi(id: number) {
  try {
    const res = await axios.get(`/api/user/bookmark/${id}`);

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching feed data:", error);
    return [];
  }
}