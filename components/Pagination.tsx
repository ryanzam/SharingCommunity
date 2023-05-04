import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginateComponent = ({currentPage, pages, nextPage}: any) => {
    const pageLinks = [];
    let start=(currentPage)-(currentPage % 5);
    if(start<=0)
        start=1;
    for (let i = start; i <= start+6 && i <= pages; i++) {
        pageLinks.push(
            <PaginationItem active={currentPage === i}>
                <PaginationLink onClick={() => nextPage(i)}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        )
    }
    return (
        <Pagination aria-label="Page navigation example">      
            {pageLinks}
        </Pagination>
    )
}
export default PaginateComponent;