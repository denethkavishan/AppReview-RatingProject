import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

type ReviewData = {
  rating: number;
  comment: string;
};

const StarRating = ({ selected, onSelect }: { selected: number; onSelect: (rating: number) => void }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => onSelect(i)}>
          <Text>{i <= selected ? '★' : '☆'}</Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return <View style={{ flexDirection: 'row' }}>{renderStars()}</View>;
};

const AppRatingReviewPage = ({ navigation }: { navigation: any }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState<ReviewData[]>([]);

  const handleRatingSelection = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const submitReview = () => {
    console.log(`Rating: ${rating}, Comment: ${comment}`);
    const newReview = { rating, comment };
    setSubmittedReviews([...submittedReviews, newReview]);
    setRating(0);
    setComment('');
    navigation.navigate('AboutPage'); // Navigate to the AboutPage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Our App</Text>

      {/* Rating Input */}
      <StarRating selected={rating} onSelect={handleRatingSelection} />

      {/* Comment Input */}
      <Text>Leave a comment:</Text>
      <TextInput
        style={[styles.input, styles.commentInput, { color: 'black' }]}
        placeholder="Enter your comment"
        multiline
        value={comment}
        onChangeText={setComment}
      />

      {/* Submit Button */}
      <Button title="Submit Review" onPress={submitReview} />

      {/* Display submitted reviews */}
      <ScrollView style={styles.scrollView}>
        {submittedReviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Review {index + 1}:</Text>
            <Text style={styles.submittedText}>Rating: {review.rating}</Text>
            <Text style={styles.submittedText}>Comment: {review.comment}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const AboutPage = () => {
  return (
    <View style={styles.container}>
      <Text>About Page</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppRatingReviewPage">
        <Stack.Screen name="AppRatingReviewPage" component={AppRatingReviewPage} />
        <Stack.Screen name="AboutPage" component={AboutPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'darkblue',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  commentInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  scrollView: {
    width: '100%',
  },
  reviewContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'darkgreen',
  },
  submittedText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default App;
