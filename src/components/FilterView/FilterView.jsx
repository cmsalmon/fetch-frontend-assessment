import { Button, Group, Select, SegmentedControl} from "@mantine/core";
import { useForm } from '@mantine/form';
import style from './FilterView.module.scss';

const size = ['5', '10', '15', '20', '25', '30', '35', '40'];
const sort = ['Breed', 'Name', 'Age'];
const sortDirection = [{label: "Ascending", value: "asc"}, 
    {label: "Descending", value: "desc"}]

function FilterView({searchParam, setSearchParam}) {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            size: '25',
            sortBy: 'Breed',
            direction: 'asc'
        }
    });

    const handleViewChange = (e) => {
        const size = e.size;
        const sort = e.sortBy.toLowerCase() + ':' + e.direction;
        setSearchParam({...searchParam, size: size, sort: sort});
    }
    
    return (
        <form className={style.filterBar} onSubmit={form.onSubmit((e) => handleViewChange(e))}>
            <Group justify="flex-end">
                <Select 
                    size='xs'
                    key={form.key('size')}
                    label="Items per page" 
                    data={size} 
                    defaultValue={"25"}
                    {...form.getInputProps('size')}
                />
                <Select 
                    size='xs'
                    key={form.key('sortBy')}
                    label="Sort by:" 
                    data={sort} 
                    defaultValue={'Breed'}
                    {...form.getInputProps('sortBy')}
                />
                <SegmentedControl
                    size='xs'
                    className={style.direction}
                    key={form.key('direction')}
                    data={sortDirection} 
                    defaultValue="asc"
                    {...form.getInputProps('direction')}
                />
                <Button className={style.apply} color='#E4A509' type='submit'>Apply</Button> 
            </Group>             
        </form>
    );
}

export default FilterView