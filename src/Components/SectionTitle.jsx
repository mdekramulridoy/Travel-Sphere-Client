const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto w-3/12">
            <p className="">{subHeading}</p>
            <h1 className="">{heading}</h1>
        </div>
    );
};

export default SectionTitle;