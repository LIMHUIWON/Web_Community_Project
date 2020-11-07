import * as API_MY_PAGE from '/static/js/hw/api/my_page.js';

API_MY_PAGE.get_user_info('view');
function user_info_view(res) {
    
    const user_info = `
        <div class='user_info_view_container'>
            <div class='user_info_sub_title'>
                아이디
            </div>
            <div class='user_info_name'>
                ${res['userid']}
            </div>
        </div>
        <div class='user_info_view_container'>
            <div class='user_info_sub_title'>
                이름
            </div>
            <div class='user_info_name'>
                ${res['username']}
            </div>
        </div>
        <div class='user_info_view_container'>
            <div class='user_info_sub_title'>
                닉네임
            </div>
            <div class='user_info_name'>
                ${res['nickname']}
            </div>
        </div>
        <div class='user_info_view_container'>
            <div class='user_info_sub_title'>
                이메일
            </div>
            <div class='user_info_name'>
                ${res['email']}
            </div>
        </div>
        <div class='user_info_view_container'>
            <div class='user_info_sub_title'>
                생년월일
            </div>
            <div class='user_info_name'>
                ${res['birth']}
            </div>
        </div>
        <div class='user_info_view_container'>
            <div class='user_info_sub_title'>
                프로필 사진
            </div>
            <div class='user_info_name'>
                <img src='../static/img/profile_img/${res['profile_img']}' alt='' class='user_info_image'>
            </div>
        </div>
        <div class='user_info_btn_container'>
                <button class='user_info_btn' id='user_modify_btn'>정보 수정</button>
                <button class='user_info_btn' id='user_del_btn'>회원 탈퇴</button>
        </div>`;
    
    const user_info_container = document.querySelector('.user_info_sub_container');
    user_info_container.innerHTML = user_info;
    
    view_btns_eventlistener_init();
}

function view_btns_eventlistener_init() {

    const modify_user_info_btn = document.querySelector('#user_modify_btn');
    modify_user_info_btn.addEventListener('click', () => {
        API_MY_PAGE.get_user_info('modify');
    })

    const delete_user_btn = document.querySelector('#user_del_btn');
    delete_user_btn.addEventListener('click', () => {
        if (confirm('회원 탈퇴 시 회원님의 글, 댓글도 모두 삭제됩니다.\n정말로 탈퇴하시겠습니까?') == true) {
            API_MY_PAGE.delete_user(res['id']);
        } else return;
    })

}

// ---------------------------------- 회원 정보 수정 ---------------------------------------------
function modify_user_info_init(res) {
    
    const user_info_modify = `
    <div class='user_info_view_container'>
    <div class='user_info_sub_title'>
        아이디
    </div>
    <div class='user_info_name'>
        ${res.userid}
    </div>
    </div>
    <div class='user_info_view_container'>
        <div class='user_info_sub_title'>
            이름
        </div>
        <input type='text' id='user_info_modify_name' class='user_info_modify_input' autocomplete='off'
        value='${res.username}'>
    </div>

    <div class='user_info_view_container'>
        <div class='user_info_sub_title'>
            닉네임
        </div>
        <input type='text' id='user_info_modify_nickname' class='user_info_modify_input' autocomplete='off'
        value='${res.nickname}'>
    </div>
    <div class='user_info_view_container'>
        <div class='user_info_sub_title'>
            이메일
        </div>
        <input type='text' id='user_info_modify_email' class='user_info_modify_input' autocomplete='off'
        value='${res.email}'>
    </div>
    <div class='user_info_view_container'>
        <div class='user_info_sub_title'>
            생년월일
        </div>
        <input type='text' id='user_info_modify_birth' class='user_info_modify_input' autocomplete='off'
        placeholder='YYYY-MM-DD' value='${res.birth}'>
    </div>
    <div class='user_info_view_container'>
        <div class='user_info_sub_title'>
            프로필 사진
        </div>
        <input type='file' id='user_info_modify_image' class='user_info_modify_input' autocomplete='off' accept='image/*'>
        <span class='user_info_image_sub'>변경하지 않을 시 기존 이미지 유지</span>
    </div>
    <div class='user_info_btn_container'>
                <button class='user_info_btn user_info_modify_btn'>수정하기</button>
            </div>`;

    const user_info_container = document.querySelector('.user_info_sub_container');
    user_info_container.innerHTML = user_info_modify;

    const modify_btn = document.querySelector('.user_info_modify_btn');
    modify_btn.addEventListener('click', () => {
        API_MY_PAGE.modify_user_info(res.id);
    });

}

export {user_info_view, modify_user_info_init};