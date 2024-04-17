import kakaoProfileImage from '/public/images/kakaoprofileimage.png'
import Image from 'next/image'
import bug from '/public/images/bug.png'
import settings from '/public/images/settings.png'
import bookmark from '/public/images/bookmark.png'
import backarrow from '/public/images/backarrow.png'

const MyPage = () => {
    return <>
    <div>
        <Image src={backarrow} width={20} height={20} alt="backarrow"/>
    </div>
    <h3>마이페이지</h3>
    <div>
        <Image src={kakaoProfileImage} width={40} height={40} alt="mypage"/>
        <p>김신아</p>
        <div>
            <div>
                <Image src={bookmark} width={40} height={40} alt="bookmark"/>
                <p>북마크</p>
            </div>
            <div>
                <Image src={settings} width={40} height={40} alt="bookmark"/>
                <p>설정</p>
            </div>
            <div>
                <Image src={bug} width={40} height={40} alt="bookmark"/>
                <p>버그신고</p>
            </div>

            <footer>

            </footer>
        </div>
    </div>
    </>
}
export default MyPage;