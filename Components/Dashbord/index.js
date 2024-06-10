import {Component} from 'react'
import allArrData from '../Jsondata/DataFromServer'

import { GrCaretNext,GrCaretPrevious } from "react-icons/gr";

import Totalsales from '../Totalsale'
import Barchart from '../Barchartfolder'
import PieChartComponent from '../PiechartFolder'


import './index.css'

const allMonths=['January','February',"March",'April','May','June','July','August','September','October','November','December']

class Dashbord extends Component {

state={selectMonth:'All',inputTxt:'',myArrayData:allArrData,pageSelection:1,dummyData:allArrData,isTrue:true,myYear:''}


yearFun=(event)=>{


    const {dummyData}=this.state

    const filterData=dummyData.filter((prevData)=>{

      return( new Date(prevData.dateOfSale).getFullYear().toString().includes(event.target.value.toString()) )
    //   return( new Date(prevData.dateOfSale).getFullYear().toString() === event.target.value.toString() )


    })

if(filterData.length !==0)
    {
        this.setState({myYear:event.target.value,myArrayData:filterData,pageSelection:1,isTrue:true})

    }
    else
    {
        this.setState({isTrue:false })
    }



}


selectFun=(event)=>{

    const {dummyData,myYear}=this.state

    const filterData=dummyData.filter((prevData)=>{

      return(  new Date(prevData.dateOfSale).toLocaleString('default',{month:'long'}).includes(event.target.value) && new Date(prevData.dateOfSale).getFullYear().toString().includes(myYear.toString()) )
    })

if(filterData.length !==0)
    {
        this.setState({selectMonth:event.target.value,myArrayData:filterData,pageSelection:1,isTrue:true})

    }
    else
    {
        this.setState({isTrue:false })
    }

}

inputFun=(event)=>{
    const {dummyData}=this.state
    
  
    const filterData=dummyData.filter((filterProp)=> {

        return( filterProp.title.toLowerCase().includes(event.target.value.toLowerCase()) || filterProp.description.toLowerCase().includes(event.target.value.toLowerCase()) || Math.round(filterProp.price) === parseInt(event.target.value) || parseInt(filterProp.id) === parseInt(event.target.value)  );
    }  
    )


if(filterData.length !==0)
    {

        this.setState({inputTxt:event.target.value,myArrayData:filterData,pageSelection: 1,isTrue:true })
    }
    else
    {
        console.log('noData FOund')
        this.setState({isTrue:false })
    }


}


pageSelected=(gotPage)=>{

    this.setState({pageSelection:gotPage})

}


nextBtn=()=>{

    const{myArrayData,pageSelection}=this.state

    if(pageSelection < myArrayData.length/10)
        {
            this.setState((prevArg)=>({pageSelection:prevArg.pageSelection+1}))
        }

}

prevBtn=()=>{
    const{pageSelection}=this.state

    if(pageSelection > 1)
        {
            this.setState((prevArg)=>({pageSelection:prevArg.pageSelection-1}))
        }

}


errFun=()=>(
    <div className='errCl'>

        <img className='errImg' src='https://assets.ccbp.in/frontend/react-js/failure-img.png' alt='error found'/>

        <h1>No Search Result Found</h1>
        <p>Please use Title/Description/Price/Id</p>

    </div>)


render()
{

const{inputTxt,myArrayData,pageSelection,isTrue,selectMonth,dummyData}=this.state


const onlyKey=Object.keys(myArrayData[0])

const uniqueKey= [...new Map(dummyData.map((mapProp)=> [new Date(mapProp.dateOfSale).getFullYear(),mapProp])).values()]
const uniData=uniqueKey.map((mapProp)=> new Date(mapProp.dateOfSale).getFullYear())


  return(

<div className='mainDashBord'>

<div className='formDiv'>

<input type='search' value={inputTxt} placeholder='Search Your Data' onChange={this.inputFun} className='inputCls'/>

<div>
<select onChange={this.selectFun} placeholder=''>
    <option value=''> Select Month</option>
{
    allMonths.map((mapData)=>(
<option key={mapData} value={mapData}>{mapData}</option>
    ))
}

</select>

<select onChange={this.yearFun}>
    <option value=''>Select Your Year</option>
    {uniData.map((mapProp)=>{
        return (<option key={mapProp} value={mapProp}>{mapProp}</option>)
    })}
</select>


</div>

</div>

{isTrue? 

(<div className='tablesDiv'>

<table className='tableBorder'>

<thead>
    <tr>
{
    onlyKey.map((mapData)=>{
        if(mapData === "dateOfSale")
            {
         return    null
        
        }
        return  <th key={mapData}>{mapData.toUpperCase()}</th>     
    })
}
</tr>

</thead>

<tbody>

{myArrayData.slice(pageSelection * 10 - 10 ,pageSelection*10).map((mapData)=>(

<tr key={mapData.id}>
    <td>{mapData.id}</td>
    <td>{mapData.title}</td>
    <td>{Math.round(mapData.price)} rs.</td>
    <td>{mapData.description}</td>
    <td>{mapData.category}</td>
    <td><img src={mapData.image} alt={mapData.category} className='tdImg'/></td>
    <td>{mapData.sold.toString()}</td>

</tr>
))}

</tbody>

</table>

<div className='btnDiv'>

<button type='button' className='reactBtn' onClick={this.prevBtn}>
<GrCaretPrevious className='ri'/>
</button>


{
[ ...Array(Math.ceil(myArrayData.length/10))||1].map((_,i)=> <span className={`paginationCl ${ pageSelection === i+1 ? 'bgChange':null}`} key={i} onClick={()=>this.pageSelected(i+1)}>{i+1}</span>)
}

<button type='button' className='reactBtn' onClick={this.nextBtn}>
<GrCaretNext className='ri' />

</button>

</div>



</div>):this.errFun()}


{isTrue?(<div>

<Totalsales arrDa={myArrayData} selectedMonth={selectMonth}/>

</div>):null }

{isTrue?(<div>

<Barchart arrDa={myArrayData} selectedMonth={selectMonth}/>

</div>):null }

{isTrue?(<div>

<PieChartComponent arrDa={myArrayData} selectedMonth={selectMonth}/>

</div>):null }

</div>
)
}

}

export default Dashbord

