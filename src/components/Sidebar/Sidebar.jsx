import { Box, Button, Group, Divider, MultiSelect, NumberInput, RangeSlider, Stack, Text, Title } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useEffect, useState } from "react";
import { logout } from "../../hook/user";
import style from './Sidebar.module.scss'

const marks = [
    {value: 0, label: '0'},
    {value: 5, label: '5'},
    {value: 10, label: '10'},
    {value: 15, label: '15'},
    {value: 20, label: '20'},
];

function Sidebar({navigate, setSearchParam, favList, setMatch, open, getDogs}) {
    const [breedList, setBreedList] = useState();
    
    useEffect(() => {
        fetchDogBreeds(); 
    }, [])
   
    const fetchDogBreeds = async() => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_FETCH_BASE_URL}/dogs/breeds`,
                {
                    method: 'GET',
                    credentials: 'include',
                },       
            );
            if (res.status == 401) {
                logout(navigate);
                return; 
            } else {
                const breeds = await res.json(); 
                setBreedList(breeds);
            }
            
        } catch (error) {
            console.error(error); 
        }
    }

    const  findMatch = async(favList) => {  
        let match;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_FETCH_BASE_URL}/dogs/match`,
                {
                    method: 'POST',
                    body: JSON.stringify(favList),
                    headers: {
                        'Content-Type': 'application/JSON'
                    },
                    credentials: 'include',
                },       
            );
            if (res.status == 401) {
                logout(navigate);
                return; 
            } else {
                match = await res.json();
            }   
        } catch (error) {
            console.error(error); 
        }
        let matchArray = [`${match.match}`];
        const myMatch = await getDogs(matchArray);

        return myMatch[0];
    };

    const handleSearch = (e) => {
        let searchHasVal = false;
        for (const [key, value] of Object.entries(e)) {
            if (`${key}` === "breeds" && value.length > 0) {
                searchHasVal = true;
            } else if (`${key}` !== "breeds" && value) {
                searchHasVal = true
            }
        }
        if (!searchHasVal) {
            setSearchParam({sort: "breed:asc"})
        } else {
            setSearchParam(e);
        }
        
    }

    const handleFindMatch = async() => {
        if (favList.length > 0) {
            const match = await findMatch(favList);
            setMatch(match);
            open(true);
        }
    }

    const form = useForm({
        mode: 'uncontrolled',
        validate: {
            zipCodes: (value) => (!value || value?.length === 0  ? null : value.toString().length !== 5 ? 'Zipcode must be 5 digits' : null)
        }
    });
    
    return (
        <Box className={style.sidebarContainer}>
            <Box className={style.sidebar}>
                <Stack className={style.sidebarContent} justify="space-between">
                    <form onSubmit={form.onSubmit((e) => handleSearch(e))}>
                        <Group className={style.title} justify='center'>
                            <Title order={2}>Search</Title>
                        </Group>
                        <Stack className={style.form} justify="space-between">
                            <Divider />
                            <MultiSelect
                                className="breedDropdown"
                                key={form.key('breeds')}
                                searchable
                                label='Breeds'
                                placeholder="Select a breed"
                                data={breedList}
                                marks={marks}
                                {...form.getInputProps('breeds')}
                            />
                            <Text size='sm' fw={500}> Age Range </Text>
                            <RangeSlider 
                                className="ageSlider"
                                color='#44055D'
                                key={form.key('age')} 
                                min={0} 
                                max={20} 
                                minRange={1} 
                                defaultValue={[0, 20]} 
                                marks={marks}
                                {...form.getInputProps('age')}
                            />
                            <NumberInput 
                                className="zipcodeInput"
                                key={form.key('zipCodes')}
                                allowLeadingZeros={true}
                                trimLeadingZeroesOnBlur={false}
                                label="Zipcode" 
                                hideControls
                                {...form.getInputProps('zipCodes')}
                            />
                            <Button color='#44055D' type='submit'>Search</Button>
                        </Stack>       
                    </form>
                    <Button color='#E4A509' size='lg' onClick={() => handleFindMatch()}>Find My Match!</Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default Sidebar