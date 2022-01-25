// 1.컴포넌트-메인 MainComponent
// 2.컴포넌트-입력폼 NoticeComponent
// 3.컴포넌트-출력 ListComponent

class MainComponent extends React.Component {
    render(){
        return(
            <>
                <div id='main'>
                    <div className='title'>
                        <h1>Notice Form</h1>
                    </div>
                    <div className='content'>
                        <NoticeComponent />
                    </div>
                </div>
            </>
        )
    }
}

class NoticeComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            subjectValue:'',
            dateValue: ''
        }
    }
    onChangeSubject = (e)=>{
       this.setState({
           subjectValue: e.target.value
        });  //state 변경 
    }
    onChangeDate = (e) => {        
        this.setState({
            dateValue: e.target.value
        });
    }


    //로컬스토레이지 저장
    onClickSubmitfn = (e) => {
        localStorage.setItem(this.state.subjectValue, this.state.subjectValue + ',' + this.state.dateValue );
        this.setState({subjectValue:''});
        this.setState({dateValue:''});
    }

    render(){

        return(
            <>
                <div id='notice'>
                    <div className='title'>
                        <form>
                            <div><input type='text' id='subject' value={this.state.subjectValue} onChange={this.onChangeSubject} placeholder='제목'/></div>
                            <div><input type='text' id='date' value={this.state.dateValue} onChange={this.onChangeDate} placeholder='날짜'/></div>
                            <div><button type='submit' onClick={this.onClickSubmitfn}>ADD</button></div>
                        </form>
                    </div>
                    <div className='content'>
                        <h2>Notice List</h2>
                        <ListComponent />
                    </div>
                </div>
            </>
        )
    }
}

class ListComponent extends React.Component {
    render(){
        return(
            <>
                <div id='list'>
                    <div className='content'>
                        <ul>
                            {/* 출력목록 */}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

ReactDOM.render(
    <MainComponent/>,
    document.querySelector('#app')
);

