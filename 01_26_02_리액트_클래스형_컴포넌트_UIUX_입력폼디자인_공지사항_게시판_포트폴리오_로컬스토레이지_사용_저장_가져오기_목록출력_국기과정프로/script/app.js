// 1. html 돔컨테이너 #app
// 2. ReactDOM 연결
//3. JSX 가상태그(컴포넌트) React.Component 생성 연결

class MainComponent extends React.Component {
  render(){

    const {title} = this.props;

    return(
        <>
            <div id='noticeBoard'>
                 <div className='container'>
                      <div className='title'>
                          <h1>{title}</h1>
                      </div>
                      <div className='content'>
                          <NoticeComponent />
                      </div>
                 </div>
            </div>
        </>
    )
  }
}



class NoticeComponent extends React.Component {
                                                //0~11
  toDay = new Date();  //날짜객체 생성

  constructor(props){
    super(props);
    this.state={
        nextId: localStorage.length+1,  //초기값
        subjectInput: '',
        contentsInput: '',
        dateInput: this.toDay.getFullYear() + "-" + this.toDay.getMonth()+1 + "-" + this.toDay.getDate()
    }
  }

  // 키보드 입력값 적용 이벤트 함수
  onChangeSubjectInput = (e) => {
    this.setState({subjectInput: e.target.value });
  }
  onChangeContentsInput = (e) => {
    this.setState({contentsInput: e.target.value });
  }
  onChangeDateInput = (e) => {
    this.setState({dateInput: e.target.value });
  }
 
  // 1 전송버튼에 이벤트 차단 e.preventDefault()
  // 2 입력데이터 배열에 추가하기
  // 3 출력목록에 게시판(배열내용 모두) 출력하기

  onClickSubmit = (e) => {
      e.preventDefault();

      const {nextId,subjectInput,contentsInput,dateInput} = this.state;

      
      // 임시변수수정
      // 로컬에 저장된 번호를 가져와서 번호를 증가한다.
      // 로컬스토레이지(localStorage) 저장소 5MB ~ 100MB 정도 저장소 
      // 브라우저 메모리에 계속 저장 삭제하지 않으면 보관된다
      // 객체와 배열은 반드시 문자열로 변환후 저장한다.[JSON.stringify(객체배열)]
      // 객체와 배열은 출력 사용시 다시 객체 배열로 변환후 사용한다. [JSON.parse(문자열)]
      // localStorage.setItem(키, 키값문자열); 저장
      // localStorage.getItem(키); 가져오기
      // localStorage.removeItem(키); 삭제하기
      // localStorage.clear;  전체삭제
      // localStorage.length;  길이(레코드갯수)

      // 이제는 배열에 저장 안하고 
      // 로컬스토레이지에 저장
      // 로컬스토레이지에서 키를 가져와서 변수에 저장하기 
      //객체형식으로 저장 그리고 로컬스토레이지에는 문자형식으로 변환해서 저장  : JSON.stringify(obj) 
      // 그리고 출력할 때는 
      // 로컬스토레이지에 저장된 객체형식의 문자열을 객체형식으로 변환해서 출력
      const obj = {
        id: nextId,
        subject: subjectInput,
        contents: contentsInput,
        date: dateInput
      }

      localStorage.setItem(nextId, JSON.stringify(obj)  );      
      // 새로고침 하면 맨위에 초기값이 1로 새로설정되는데 
      // 그 초기값을 로컬스토레이지 길이+1로 설정하면 다음번호로 카운트
      this.setState({nextId: nextId+1 });
      this.setState({subjectInput: '' });
      this.setState({contentsInput: '' });

  }


  render(){
    
    const {subjectInput,contentsInput,dateInput} = this.state;

    return(
        <>
          <div id='notice-form'>
            <div class='container'>
              <form name='noticeForm' id='noticeForm' mothod='get' action='./response.php'>
                  <ul>
                    <li>
                       <input type='text' id='subject' value={subjectInput} onChange={this.onChangeSubjectInput} placeholder='Subject'/>
                    </li>  
                    <li>
                       <textarea id='contents' value={contentsInput} onChange={this.onChangeContentsInput} placeholder='Content'></textarea>
                    </li>  
                    <li>
                       <input type='text' id='date' value={dateInput} onChange={this.onChangeDateInput} placeholder='Date' />
                    </li>  
                  </ul>                
                  <div className='button-wrap'>
                      <button type='submit' onClick={this.onClickSubmit}>ADD</button>
                  </div>
              </form>

              <NoticeListComponent  />

            </div>
          </div>
        </>
    )
  }
}


class NoticeListComponent extends React.Component {
  render(){
    
   let notice = [];

    //로컬스토레이지 데이터 가져오기 줄단위 1 2 3 4 5
    // console.log( localStorage.getItem(1) );  //키 밸류 가져오기
    // json 데이터 객체 형식으로 전환 JSON.parse()
    // console.log( JSON.parse( localStorage.getItem(1) ) ); 

    // notice[0] = JSON.parse(localStorage.getItem(1));
    // notice[1] = JSON.parse(localStorage.getItem(2));
    // notice[2] = JSON.parse(localStorage.getItem(3));
    // notice[3] = JSON.parse(localStorage.getItem(4));
    // notice[4] = JSON.parse(localStorage.getItem(5));
    // notice[5] = JSON.parse(localStorage.getItem(6));
    // notice[6] = JSON.parse(localStorage.getItem(7));

    for(let i=0; i<localStorage.length; i++){
      notice[i] = JSON.parse(localStorage.getItem(i+1));
    }


    const noticeListfn = notice.map((item)=>{
        return(
            <tr key={item.id}>
              <td>{item.id}</td>
              <td><a href='#'>{item.subject}</a></td>
              <td>{item.date}</td>
            </tr>
        )
    });

    return(
        <>
          <div className='notice-list'>
            <table>

                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>제목</th>
                    <th>날짜</th>
                  </tr>
                </thead>

                <tbody>
                  {noticeListfn}
                </tbody>             

            </table>
          </div>
        </>
    )
  }
}





MainComponent.defaultProps = {
  title: 'StarBucks Notice Board',
}

NoticeComponent.defaultProps = {
  notice: [
        {
          id: 1, 
          subject: "스타벅스 카드 유효기간 관련 정책 보완 안내", 
          contents: "스타벅스 카드 유효기간 관련 당사 운영 정책 중 강화된 사항 안내 말씀드립니다. 현재 스타벅스 카드 이용 약관 상에 유효기간 5년이 명시되어 있으나, 당사는 유효기간에 대한 기준을 탄력적으로 운영하며 고객님의 이익을 최우선 보호할 수 있도록 운영 중에 있습니다. 스타벅스는 그동안에도 스타벅스 카드 마지막 사용일로부터 5년이 지난 잔액도 고객님의 요청 시 재차 새로운 카드를 발급해서 잔액을 보전해 드리는 정책을 진행해 온 바 있으며, 이는 앞으로도 변함없이 유지됩니다. 향후에는 고객님의 혼선 예방 및 보다 원활한 이용을 위해 해당사항과 관련해 보다 보완된 정책을 운영합니다.",
          date: "2022-01-05" 
        },
        {
          id: 2, 
          subject: "시스템 개선 및 점검 안내", 
          contents: "스타벅스 카드 유효기간 관련 당사 운영 정책 중 강화된 사항 안내 말씀드립니다. 현재 스타벅스 카드 이용 약관 상에 유효기간 5년이 명시되어 있으나, 당사는 유효기간에 대한 기준을 탄력적으로 운영하며 고객님의 이익을 최우선 보호할 수 있도록 운영 중에 있습니다. 스타벅스는 그동안에도 스타벅스 카드 마지막 사용일로부터 5년이 지난 잔액도 고객님의 요청 시 재차 새로운 카드를 발급해서 잔액을 보전해 드리는 정책을 진행해 온 바 있으며, 이는 앞으로도 변함없이 유지됩니다. 향후에는 고객님의 혼선 예방 및 보다 원활한 이용을 위해 해당사항과 관련해 보다 보완된 정책을 운영합니다.",
          date: "2022-01-07" 
        },
        {
          id: 3, 
          subject: "스타벅스 코리아 이용약관 개정 안내", 
          contents: "스타벅스 카드 유효기간 관련 당사 운영 정책 중 강화된 사항 안내 말씀드립니다. 현재 스타벅스 카드 이용 약관 상에 유효기간 5년이 명시되어 있으나, 당사는 유효기간에 대한 기준을 탄력적으로 운영하며 고객님의 이익을 최우선 보호할 수 있도록 운영 중에 있습니다. 스타벅스는 그동안에도 스타벅스 카드 마지막 사용일로부터 5년이 지난 잔액도 고객님의 요청 시 재차 새로운 카드를 발급해서 잔액을 보전해 드리는 정책을 진행해 온 바 있으며, 이는 앞으로도 변함없이 유지됩니다. 향후에는 고객님의 혼선 예방 및 보다 원활한 이용을 위해 해당사항과 관련해 보다 보완된 정책을 운영합니다.",
          date:'2022-01-07'
        }
  ]

}


ReactDOM.render(
  <MainComponent/>,
  document.querySelector('#app')
);


