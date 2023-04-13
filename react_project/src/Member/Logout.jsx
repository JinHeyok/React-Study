import {Link} from 'react-router-dom'


const Logout = () => {

    const logotTitle = "로그아웃 화면입니다.";
    sessionStorage.clear();
    window.location.replace("/");
    return(
        <>
            <h4>{logotTitle}</h4>
            <Link to="/"><h5>돌아가기</h5></Link>
        </>
    );
}

export default Logout;