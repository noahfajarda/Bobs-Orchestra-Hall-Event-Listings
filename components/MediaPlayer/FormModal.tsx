import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import ReactLoading from "react-loading";

// API
import { getAccessToken, searchTrack } from "../../utils/spotifyAPIcalls";
import SearchResult from "./searchResult";

export default function FormModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const [errorText, setErrorText] = useState("");

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      // error handling
      if (!search) {
        setErrorText("Please Enter A Value");
        setTimeout(() => {
          setErrorText("");
        }, 5000);
        return;
      }
      setErrorText("");

      // set loading
      setIsloading(true);
      // get spotify access token
      const accessToken = await getAccessToken();
      // search api
      const data = await searchTrack(search, accessToken);
      // remove loading & set results
      setIsloading(false);
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button onClick={onOpen} className="m-8 hover:scale-110">
        Search
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setResults([]);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <form id="song-form" onSubmit={handleFormSubmit}>
              <FormControl>
                <FormLabel>Search!</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  name="search"
                  value={search}
                />
                <FormHelperText>
                  Search any song you can find on spotify!
                </FormHelperText>
              </FormControl>
            </form>
            {isLoading && (
              <div className="text-center flex flex-col items-center">
                <ReactLoading type="bubbles" color="#fff" />
              </div>
            )}
            <div className="text-center flex flex-col items-center italic text-red-400 pt-4">
              {errorText}
            </div>
          </ModalBody>
          <ModalFooter
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button type="submit" form="song-form">
              Submit
            </Button>
          </ModalFooter>
          <ModalBody>
            {results.length !== 0 && (
              <div>
                {results.map((track) => (
                  <SearchResult
                    key={track.id}
                    track={track}
                    onClose={onClose}
                  />
                ))}
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
