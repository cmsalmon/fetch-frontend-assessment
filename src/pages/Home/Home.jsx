import { Group, Stack, Flex, Text, Modal } from "@mantine/core";
import "@mantine/core/styles.css"
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { fetchDogs } from "../../hook/dogs";
import DogCard from '../../components/DogCard/DogCard';
import { useEffect, useState } from "react";
import style from "./Home.module.scss";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "../../components/NavBar/NavBar";
import FilterView from "../../components/FilterView/FilterView";
import PageControl from "../../components/PageControl/PageControl";

    // color='#44055D'
function Home() {
    const navigate = new useNavigate();
    const { isLoading, dogId, data, getDogs, searchParam, setSearchParam} = fetchDogs(navigate); 
    const [currPage, setPage] = useState(1);
    const [favList, setFavList] = useState([]);
    const [match, setMatch] = useState({});
    const [opened, {open, close}] = useDisclosure(false);

    const pages = Math.ceil(dogId.total / (searchParam?.size ? searchParam?.size : 25));

    useEffect(() => {
        getDogs();
    }, [searchParam])

    const handlePageChange = (e) => {
        setPage(parseInt(e));
        const from = searchParam?.size ? parseInt(searchParam?.size) * (e - 1) : 25 * (e - 1);
        setSearchParam({...searchParam, from: from})
    }

    return (
        <Stack className={style.home} >
            <NavBar navigate={navigate} />
            <Flex className={style.container}>
                <Modal.Root opened={opened} onClose={close} size='auto' >
                    <Modal.Overlay />
                    <Modal.Content className={style.modalContainer}>
                        <Modal.Header>
                            <Modal.Title fw={800}>Congratulations, Match Found!</Modal.Title>
                            <Modal.CloseButton />
                        </Modal.Header>
                        <DogCard
                            key={match.id}
                            id={match.id} 
                            img={match.img} 
                            name={match.name} 
                            age={match.age} 
                            zipcode={match.zip_code} 
                            breed={match.breed}
                            favList={favList}
                            setFavList={setFavList}
                            withFavButton={false}
                        />
                    </Modal.Content>
                </Modal.Root>
                <Sidebar navigate={navigate} setSearchParam={setSearchParam} favList={favList} setMatch={setMatch} open={open} getDogs={getDogs}/>
                <Stack className={style.resultContainer}>
                    <FilterView 
                        searchParam={searchParam}
                        setSearchParam={setSearchParam}
                    />
                    <Stack justify="center"className={style.dogCards}>
                    <PageControl pages={pages} currPage={currPage} handlePageChange={handlePageChange}  />
                    <Group className={style.dogCards} justify="space-between">
                        {isLoading && (
                            <Text>Loading your search results...</Text>
                        )}
                        {
                            !isLoading && data && data?.map((dog) => {
                                return(
                                    <DogCard
                                        key={dog.id}
                                        id={dog.id} 
                                        img={dog.img} 
                                        name={dog.name} 
                                        age={dog.age} 
                                        zipcode={dog.zip_code} 
                                        breed={dog.breed}
                                        favList={favList}
                                        setFavList={setFavList}
                                        withFavButton={true}
                                    />
                                );
                            })
                        }
                        {
                            !isLoading && parseInt(dogId.total) === 0 && (
                                <Text>No matches</Text>
                            )
                        }
                    </Group>
                    <PageControl pages={pages} currPage={currPage} handlePageChange={handlePageChange}  />
                    </Stack>
                </Stack>
            </Flex>
            <Group className={style.footer}>
                <Text>Icons by <a target="_blank" href="https://icons8.com">Icons8</a></Text>
                <Text>Logos by <a target="_blank" href="https://brandfetch.com/fetchrewards.com">Brandfetch</a></Text>
            </Group>
        </Stack>
    );
}

export default Home