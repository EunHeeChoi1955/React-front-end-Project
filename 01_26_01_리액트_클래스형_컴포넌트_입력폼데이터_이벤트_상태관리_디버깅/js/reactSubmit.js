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
        
            // let arr = [
            //     {
            //         id: this.state.id, 
            //         subject: this.state.subjectValue,
            //         date: this.state.dateValue
            //     }
            // ]
        
            // 수정
            // 배열 [] 브라켓을 지워주세요
            // 배열이 아래에서 또 생겨서 이중 배열이 되었어요_

            let arr =
                {
                    id: this.state.id, 
                    subject: this.state.subjectValue,
                    date: this.state.dateValue
                }
            

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


        let notice = [];

        for(let i=0; i<localStorage.length; i++){
          notice[i] = JSON.parse(localStorage.getItem(i+1));
        }
    
        


    
        const noticeListfn = notice.map((item, idx)=>{
            return(
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td><a href='#'>{item.subject}</a></td>
                  <td>{item.date}</td>
                </tr>
            )
        });




        return (
            <div>
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
                            {noticeListfn}
                    </tbody>
                </table>  
            </div>
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
