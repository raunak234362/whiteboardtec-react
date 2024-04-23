import { BannerPropType } from "."

function PageBanner(props: BannerPropType) {
  return (
    <>
        <section className="shadow-inner" style={{ backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(250, 250, 250, 0.2)), url("${props.image}")`, boxShadow: "inset 0 5px 5px rgba(0, 0, 0, 0.5)", backgroundPosition: "center center", backgroundRepeat:"no-repeat" }}>
            <div className="w-full h-64 lg:max-w-screen-lg xl:max-w-screen-xl px-5 mx-auto">
                <div className="text-5xl font-medium py-20 text-black" style={{ textShadow: "6px 6px 5px #fff",  }}>
                    <div className="font-bold text-6xl">{props.header}</div>
                    {props.subheader && (props.subheader)}
                </div>
            </div>
        </section>
    </>
  )
}

export default PageBanner;