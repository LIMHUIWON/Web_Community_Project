
const POST_URL = 'http://127.0.0.1:5000/api/post';
const FILE_UPLOAD_URL = 'http://127.0.0.1:5000/api/postupload';
const USER_INFO_URL = 'http://127.0.0.1:5000/api/user_info';
const BOARD_URL = 'http://127.0.0.1:5000/api/board';
const COMMENT_URL = 'http://127.0.0.1:5000/api/comment/';

//보드 게시판 (개별)조회
async function fetch_getBoard(board_id){
	const response = await fetch(BOARD_URL+`/${board_id}`);
	
	if(response.ok){
		return response.json();
	}
	else{
		alert("HTTP-ERROR: " + response.status);
	}
	return response.json();

}

//post 조회  (get)
async function fetch_getPost(id,page){
	const param = `?board_id=${id}&page=${page}`; //url뒤 변수부분 
	//get 요청 url 방식 /api/post?board_id=1&page=1 (id,page가 1일때 예시)
	const response = await fetch(POST_URL+param);
	if(response.ok){
		return response.json();
	}

	else{
		alert("HTTP-ERROR: " + response.status);
	}
	return response.json();
}
/*=============추가페이지 로드 post get====================*/
async function fetch_getNewPost(id,page){
	const param = `?board_id=${id}&page=${page}`; //url뒤 변수부분 
	//get 요청 url 방식 /api/post?board_id=1&page=1 (id,page가 1일때 예시)
	const response = await fetch(POST_URL+param);
	if(response.ok){
		return response.json();
	}

	else{
		return null;
	}

}

///========Post info fetch=========== //
async function fetch_getPostInfo(board_id){
	const response = await fetch(POST_URL+`/${board_id}`);
	if(response.ok){
		return response.json();
	}
	else{
		alert("HTTP-ERROR: " + response.status);
	}
	return response.json();
}
///========Post info Comment fetch=========== //

async function fetch_getComment(post_id){
	const response = await fetch(COMMENT_URL+post_id);
	if(response.ok){
		return response.json();
	}
	else{
		alert("HTTP-ERROR: " + response.status);
	}
	return response.json();
}

//////////post 입력//////
async function fetch_insert(data){
	const response = await fetch(POST_URL,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(data)
	});
	if(response.ok){
			return; //response.json();
		}
		else if(response.status === 400){
			alert("제목을 입력해주세요");
		}
		else{
			alert("HTTP-ERROR: " + response.status);
		}
	}

//post 삭제//
async function fetch_delete(id){
	const response = await fetch(POST_URL+`/${id}`,{
		method: 'DELETE',
	})
	if(response.ok){
		return alert("삭제되었습니다!");
	}
	else{
		alert("HTTP-ERROR: " + response.status);
	}
}

//post 수정 //
async function fetch_modify(id , data){
	const url = POST_URL + '/' + id;
	const response = await fetch(url,{
		method: 'PUT',
		headers: { 
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(data)
	});

	if(response.ok){
		return load_postinfo(id);

	}
	else{
		alert("HTTP-ERROR: " + response.status);
	}
}


//============유저 정보 불러오는 fetch api=================//
async function fetch_userinfo(){
	if(sessionStorage==null){
		alert('로그인을 먼저 해주세요');
		return null;
	}
	const token = sessionStorage.getItem('access_token');
	const response = await fetch(USER_INFO_URL,{
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': token
		}
	});
	if(response.ok){
		return response.json();
	}
	else{
		alert("HTTP-ERROR: " + response.status);

	}
}


//============이미지 파일 업로드  fetch api=================//
function fetch_upload(id,files){//파일받아와서 
  const url = FILE_UPLOAD_URL + '/' + id;
  const data = new FormData();
  data.append('file',files); //data에 파일연결 
  console.log(data);
  return fetch(url,{
    method: 'POST',
    body: data
  }).then(function(response) {
    if(response.ok){
      return alert("파일업로드 완료!");
    }
    else{
      alert("HTTP-ERROR: " + response.status);
    }
  });
}
