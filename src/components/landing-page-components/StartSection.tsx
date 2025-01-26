import Button from "../ui/Button"

type Props = {  
}
 const stats = [
    {
        value: "260",
        label: "Foundations",
    },
    {
        value: "960",
        label: "Users",
    },
    {
        value: "231",
        label: "Succesful Volunteers",
    },
    {
        value: "10k",
        label: "People Helped",
    },
]

const StartSection = (props: Props) => {
    return (
        <section className="text-white flex justify-center items-center py-16">
            <div className="container mx-auto px-4 w-full md:px-6 lg:px-6">
                <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:flex lg:justify-between max-w-5xl lg:mx-auto gap-y-8 sm:gap-y-12 ">
                    <div className="text-center lg:text-left flex flex-col items-center w-full lg:w-[50ch] gap-4 lg:gap-8 lg:items-start">
                        <h3 className="text-[1.5em]">Our app connects foundations with volunteers,
                        creating impactful opportunities for both.</h3>
                        <p className="text-grey">We will help you to achieve the same as a company or volunteer!</p>
                        <Button variant="primary" textColor="black" type="button">Let&apos;s get started</Button>
                    </div>
                    <div className="grid grid-cols-2 mx-auto gap-4 xl:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center bg-[#0F112B] p-6 py-12 sm:p-10 md:px-8 sm:py-16 rounded-lg">
                                <p className="text-[2em] font-kantumruy md:text-[2.5em] capitalize font-semibold">
                                    {stat.value}<span className="text-blue">+</span>
                                </p>
                                <p className="text-sm font-kantumruy sm:text-base">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StartSection