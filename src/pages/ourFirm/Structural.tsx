const structural = [
    {
        "name": "Structural 1",
    }
]

function Structural() {
  return (
    <div>
        {structural.map((item, index) => (
                <div key={index}>
                    <h2>{item.name}</h2>
                </div>
            ))
        }
    </div>
  );
}

export default Structural;