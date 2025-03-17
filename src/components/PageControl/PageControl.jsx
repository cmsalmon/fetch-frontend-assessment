import { Box, Group, Pagination } from "@mantine/core";
import style from './PageControl.module.scss'

function PageControl({pages, currPage, handlePageChange }) {

    return (
        <Box className={style.pagination}>
            <Pagination.Root
                color="#44055D"
                total={pages} 
                boundaries={1}
                siblings={1}
                value={currPage}
                onChange={(e) => handlePageChange(e)}
            >
                <Group justify="center">
                    <Pagination.First />
                    <Pagination.Previous />
                    <Pagination.Items />
                    <Pagination.Next />
                    <Pagination.Last />
                </Group> 
            </Pagination.Root>
        </Box>
    );
}

export default PageControl