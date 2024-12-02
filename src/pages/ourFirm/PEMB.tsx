const pembImg = [
    {
        "id": 1,
    }
]

function PEMB(){
    return(
        <div className="pemb">
            {pembImg.map((image,index)=>(
                <div key={index}>
                    <h2>{image.id}</h2>
                </div>
            ))}
        </div>
    )
}
export default PEMB;