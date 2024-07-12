import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Dimensions, Modal, TouchableOpacity } from 'react-native';

const Characters = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://thronesapi.com/api/v2/Characters');
      const data = await response.json();
      setCharacters(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setLoading(false);
    }
  };

  const openCharacterDetails = (character) => {
    setSelectedCharacter(character);
  };

  const closeCharacterDetails = () => {
    setSelectedCharacter(null);
  };

  const numColumns = 4; 

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f7d17e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game of Thrones Characters</Text>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.characterItem}
            onPress={() => openCharacterDetails(item)}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.characterImage}
              resizeMode="cover"
            />
            <Text style={styles.characterName}>{item.fullName}</Text>
          </TouchableOpacity>
        )}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Character Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedCharacter !== null}
        onRequestClose={closeCharacterDetails}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: selectedCharacter?.imageUrl }}
              style={styles.modalImage}
              resizeMode="cover"
            />
            <Text style={styles.modalTitle}>{selectedCharacter?.fullName}</Text>
            <Text style={styles.modalDescription}>{selectedCharacter?.title}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeCharacterDetails}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Characters;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b2b2a',
  },
  container: {
    flex: 1,
    backgroundColor: '#2b2b2a',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  characterItem: {
    alignItems: 'center',
    margin: 5,
    width: Dimensions.get('window').width / 2 - 20,
    marginBottom: 20,
  },
  characterImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2b2b2a',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#f7d17e',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  flatListContent: {
    paddingBottom: 100, 
  },
});
