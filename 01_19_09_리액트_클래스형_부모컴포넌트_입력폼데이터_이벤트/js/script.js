//부모 컴폰너트(Parent Component)
class MainComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {     //Update 수정 유지 정보관리(상태관리) state
           txt: ''   //입력상자 텍스트 할일 내용
        }
    }

    onChangefn = (e) => {

       this.setState({txt: e.target.value }) 

    }


    render(){
        const {txt} = this.state;
        const {title} = this.props;


        return(
            <>
               <section id='section1'>
                  <div className='container'>
                    <div className="title" style={{textAlign:'center'}}>
                        <h1 style={{fontSize:'30px', color:'#c77', textAlign:'center'}}>{title}</h1>
                        
                        <input style={{width:'300px',height:'50px', border:'1px solid #c00'}} value={txt} onChange={this.onChangefn} />
                        
                        <button  style={{cursor:'pointer',fontSize:'20px',backgroundColor:'#222',color:'#fff',padding:'10px 30px'}}>1씩증가</button>&nbsp;
                        <button  style={{cursor:'pointer',fontSize:'20px',backgroundColor:'#222',color:'#fff',padding:'10px 30px'}}>1씩감소</button>
                    </div>  
                    <div className="content">
                        <FoodListComponent txt={txt}></FoodListComponent>
                    </div>
                  </div>
               </section>
            </>
        )
    }
}

//자식 컴폰너트(Children Component)
class FoodListComponent extends React.Component {
    render(){
        const {txt} = this.props;
        return(
            <>
                <ul className='food-list' style={{fontSize:'50px',color:'#000'}}>
                     {txt}
                </ul>  
            </>
        )
    }
}

// 기본프롭스(defaultProps)
MainComponent.defaultProps = {
    title: 'Count Programming',
    txt: 0
}

// 스타일



ReactDOM.render(
    <MainComponent>컴포넌트</MainComponent>,
    document.querySelector('#app')
);
