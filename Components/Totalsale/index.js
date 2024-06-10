import './index.css'

const Totalsales=(props)=>{


    const{arrDa,selectedMonth='all Data'}=props
    

    const cont=arrDa.filter((filterProp)=> filterProp.sold.toString() === 'true'); 
    const totalSaleVar=Math.round( cont.reduce((fst,sec)=> {
        return fst +sec.price},0))
        
        const totalSoldItem=arrDa.filter((filterProp)=> filterProp.sold.toString() === 'true').length

        const totalNotSoldItem=arrDa.filter((filterProp)=> filterProp.sold.toString() === 'false').length

    return(
        
        <div className="mainStaticDiv">

<h1 className='h1Statistics'>Statistics - {selectedMonth}</h1>
<div className='allDivSec'>

    <div className='cmnDiv'>
        <p>Total sale </p>
        <p> {totalSaleVar}</p>
    </div>
    <div className='cmnDiv'>
    <p>Total sold item </p>
    <p>{totalSoldItem} </p>
    </div>
    <div className='cmnDiv'>
    <p>Total not sold item </p>
    <p> {totalNotSoldItem}</p>
    </div>


</div>

        </div>
    )


}


export default Totalsales