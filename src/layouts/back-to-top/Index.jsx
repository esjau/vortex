import ArrowIcon from "@layouts/svg-icons/Arrow";

const BackToTopModule = () => {
    return (
        <>
            {/* back to top */}
            <div className="mil-back-to-top">
                <a href="#top" className="mil-link mil-dark mil-arrow-place">
                    <span>Πάνω</span>
                    <ArrowIcon />
                </a>
            </div>
            {/* back to top end */}
        </>
    );
};
export default BackToTopModule;