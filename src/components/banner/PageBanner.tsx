import { BannerPropType } from "."

function PageBanner(props: BannerPropType) {
  return (
    <>
        <section className="shadow-inner" style={{ backgroundImage: `url("${props.image}")`, boxShadow: "inset 0 5px 5px rgba(0, 0, 0, 0.5)", backgroundPosition: "center" }}>
            <div className="w-3/4 h-64 px-40">
                <div className="text-4xl p-12 font-medium pt-20" style={{ textShadow: "10px 10px 100px rgb(50, 50, 50)" }}>
                    <div className="font-bold text-5xl">{props.header}</div>
                    {props.subheader && (props.subheader)}
                </div>
            </div>
        </section>
    </>
  )
}

export default PageBanner;