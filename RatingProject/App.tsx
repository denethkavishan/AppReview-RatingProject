import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons or any suitable library for icons

// Review interface
interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string;
}

const App: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState<number>(0); // Changed to number
  const [comment, setComment] = useState('');

  const addReview = () => {
    if (username && rating >= 1 && rating <= 5 && comment) { // Validate rating range
      const newReview: Review = {
        username,
        rating,
        comment,
        date: new Date().toDateString(),
      };
      setReviews([...reviews, newReview]);
      clearFields();
    }
  };

  // Calculate average rating
  const calculateAverageRating = (): number => {
    if (reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  // Display stars for rating
  const renderStars = (rating: number): JSX.Element => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;

    return (
      <View style={{ flexDirection: 'row' }}>
        {[...Array(Math.min(filledStars, 5))].map((_, index) => ( // Limit stars to 5
          <Ionicons key={index} name="star" size={24} color="gold" />
        ))}
        {hasHalfStar && <Ionicons name="star-half" size={24} color="gold" />}
      </View>
    );
  };

  // Clear form fields
  const clearFields = () => {
    setUsername('');
    setRating(0);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Reviews</Text>

      {/* Review Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Rating (1-5)"
          value={rating.toString()}
          onChangeText={(value) => setRating(parseInt(value))}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.commentInput]}
          placeholder="Comment"
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Button title="Submit Review" onPress={addReview} />
          <TouchableOpacity onPress={clearFields}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Reviews List */}
      <View style={styles.reviewsContainer}>
        <Text style={styles.subtitle}>Reviews:</Text>
        <FlatList
          data={reviews}
          renderItem={({ item }) => (
            <View style={styles.reviewItem}>
              <Text>{`User: ${item.username}`}</Text>
              <Text>{`Rating: ${item.rating}/5`}</Text>
              <Text>{`Comment: ${item.comment}`}</Text>
              <Text>{`Date: ${item.date}`}</Text>
              {renderStars(item.rating)}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Display average rating and total reviews */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{`Average Rating: ${calculateAverageRating().toFixed(1)}/5`}</Text>
        <Text style={styles.footerText}>{`Total Reviews: ${reviews.length}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  commentInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  reviewsContainer: {
    width: '100%',
    flex: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
  },
  clearButton: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default App;
