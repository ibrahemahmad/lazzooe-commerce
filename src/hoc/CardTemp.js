import './HocStyle.css'

export const CardTemp = ({title, children, headerBg = "", secondHead}) => {
    return (
        <div className="card  w-100 d-block  mb-3 cardsTopBorder">
            <div className={`card-header cardTitle ${headerBg} d-flex justify-content-between`}>{title} {secondHead}</div>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};