//부모 컴폰너트(Parent Component)
class MainComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {     //Update 수정 유지 정보관리(상태관리) state
           cnt: 0   //루트 변경되면 모든 컴포넌트에 전달된다. 즉시 랜더링: 리액티비티
        }
    }

    render(){

        const {cnt} = this.state;
        const {title} = this.props;

        return(
            <>
               <section id='section1'>
                  <div className='container'>
                    <div className="title" style={{textAlign:'center'}}>
                        <h1 style={{fontSize:'30px', color:'#c77', textAlign:'center'}}>{title}</h1>
                        
                        <button onClick={function(){this.setState({cnt: cnt+1})}.bind(this)} style={{cursor:'pointer',fontSize:'20px',backgroundColor:'#222',color:'#fff',padding:'10px 30px'}}>1씩증가</button>&nbsp;
                        <button onClick={function(){this.setState({cnt: cnt+1})}.bind(this)} style={{cursor:'pointer',fontSize:'20px',backgroundColor:'#222',color:'#fff',padding:'10px 30px'}}>1씩감소</button>
                    </div>  
                    <div className="content">
                        <FoodListComponent cnt={cnt}></FoodListComponent>
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
        const {cnt} = this.props;
        return(
            <>
                <ul className='food-list' style={{fontSize:'50px',color:'#000'}}>
                    {cnt}
                </ul>  
            </>
        )
    }
}

// 기본프롭스(defaultProps)
MainComponent.defaultProps = {
    title: 'Count Programming',
    cnt: 0
}

// 스타일



ReactDOM.render(
    <MainComponent>컴포넌트</MainComponent>,
    document.querySelector('#app')
);
