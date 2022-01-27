class MainComponent extends React.Component {
    render() {
        return (
            <>
                <div id='main'>
                    <div className='title'>
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className='content'>
                        <FormComponent/>
                    </div>
                </div>
            </>
        );
    }
}


class FormComponent extends React.Component {
    
    toDay = new Date();

    constructor(props){
        super(props);
        this.state = {
            id: localStorage.length+1, //새로고침해도 계속 번호는 전체갯수+1 다음번호
            subjectValue: '',
            dateValue: this.toDay.getFullYear() + '-' + this.toDay.getMonth()+1 + '-' + this.toDay.getDate()
        }
    }

    onChangeSubjectFn = (e) => {
        this.setState({
            subjectValue: e.target.value
        }); 
    }
    onChangeDateFn = (e) => {
        this.setState({
            dateValue: e.target.value
        });
    }

    //전송 저장 출력
    onClickSubmit = (e) => {
        e.preventDefault(); 
        
        let arr = [
            {
                id: this.state.id, 
                subject: this.state.subjectValue,    
                date: this.state.dateValue
            }
        ]    

        //JSON.stringify(arr) 객체를 문자열로 변환 > 출력시는 다시 객체로 변환 JSON.parse(arr);
        localStorage.setItem(this.state.id,  JSON.stringify(arr) );
        //번호 증가
        this.setState({
            id: this.state.id+1
        });
    }


    render(){
        return(
            <>
                <div id='notice'>
                    <h1>폼 요소</h1>
                    <form>
                        <div>
                            <input id='subject' value={this.state.subjectValue}  onChange={this.onChangeSubjectFn}/>
                        </div>
                        <div>
                            <input id='date' value={this.state.dateValue}  onChange={this.onChangeDateFn}/>
                        </div>

                        <div>
                            <button type='submit'  onClick={this.onClickSubmit}>ADD</button>
                        </div>

                    </form>    
                </div>

                <ListComponent/>

            </>
        )
    }
}


//ListComponent 출력
class ListComponent extends React.Component {

    render() {

        // localStorage.setItem(); //데이터저장
        // localStorage.getItem(); //데이터가져오기
        // localStorage.removeItem(); //데이터삭제
        // localStorage.key(0) //키 인덱스 번호
        // localStorage.clear(); //로컬스토레이지 전체삭제
        // localStorage.length; //로컬스토레이지 길이

        //출력할 저장 내용 가져오기
        //로컬스토레이지
        // console.log( JSON.parse( localStorage.getItem(1) ) );
        // console.log( JSON.parse( localStorage.getItem(2) ) );
        // console.log( JSON.parse( localStorage.getItem(3) ) );
        // console.log( JSON.parse( localStorage.getItem(4) ) );
        let notice = [];

        for(let i=0; i<localStorage.length; i++){
            notice[i]= JSON.parse(localStorage.getItem(i+1));
        }
        
        
        // a[0] = JSON.parse( localStorage.getItem(1))
        // a[1] = JSON.parse( localStorage.getItem(2))
        // a[2] = JSON.parse( localStorage.getItem(3))
        // a[3] = JSON.parse( localStorage.getItem(4))
        // a[4] = JSON.parse( localStorage.getItem(5))


            
        //map() 함수 이용 데이터 요소에 출력
        // const listElement = notice.map( (item)  => {
        //     return(
        //         <tr key={item.id}>
        //             <td>{item.id}</td>
        //             <td>{item.subject}</td>
        //             <td>{item.date}</td>
        //         </tr>
        //     )           
        // });

            //리듀서
        // const listElement = notice.reduce((acc, item, idx, arr) => {
        //     return(
        //         <tr key={item.id}>
        //             <td>{item.id}</td>
        //             <td>{item.subject}</td>
        //             <td>{item.date}</td>
        //         </tr>
        //     )
        // })
         


        const listElement = notice.map((v)=>{
            return(
                <tr key={v[0].id}>
                    <td>{v[0].id}</td>
                    <td>{v[0].subject}</td>
                    <td>{v[0].date}</td>
                </tr>
            )
        });



        return (
            <>
                <h1>출력</h1>
                <table className='list'>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                            {listElement}
                    </tbody>
                </table>  
            </>
        );
    }
}





MainComponent.defaultProps = {
    title:'리액트 로컬스토레이지 객체 저장 게시판 출력'
}

ReactDOM.render(
    <React.StrictMode>
        <MainComponent/>
    </React.StrictMode>,
    document.getElementById('app')
);
