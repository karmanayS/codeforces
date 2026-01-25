import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const ProblemsPagination = ({page,totalProblems}:{page:number,totalProblems:number | null}) => {
    if (!totalProblems) return null
    let lastPage:number; 
    if (totalProblems % 10 === 0) {
        lastPage = totalProblems / 10
    } else {
        lastPage = Math.floor(totalProblems / 10) + 1
    }
    console.log("Last page: ",lastPage)
    return <Pagination>
    <PaginationContent>
        <PaginationItem>
        <PaginationPrevious href={(page===1) ? "1" : `${page-1}`} />
        </PaginationItem>
        <PaginationItem>
        <PaginationLink href="1" isActive={(page === 1) ? true : false} >1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
        <PaginationLink href="2" isActive={(page === 2) ? true : false}>
            2
        </PaginationLink>
        </PaginationItem>
        <PaginationItem>
        <PaginationLink href="3" isActive={(page === 3) ? true : false} >3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
        <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
        <PaginationNext href={(page === lastPage) ? `${lastPage}` : `${page+1}`} />
        </PaginationItem>
    </PaginationContent>
    </Pagination>
}