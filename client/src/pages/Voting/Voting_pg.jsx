// src/pages/Voting/Voting_pg.jsx
import React from "react";
import MainNavbar from "../../components/navbar/main_navbar";
import "./Voting_pg.css";

import { useState, useEffect } from 'react'

function VotingPg() {
  // --- STATE VARIABLES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]); 

  // --- 1. LOAD REVIEWS FROM SERVER ---
  useEffect(() => {
    fetch('/reviews') 
      .then(response => {
        if(response.ok) return response.json();
        console.warn("Server not reachable, using local mode");
        return []; 
      })
      .then(data => {
        setReviews(data || []);
      })
      .catch(err => {
        console.error("Failed to load reviews:", err);
        setReviews([]); 
      });
  }, []);

  // --- HELPER FUNCTIONS ---
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // --- HANDLE VOTING ---
  const handleVote = (e) => {
    const card = e.target.closest('.card');
    const selectedOption = card.querySelector('input[type="radio"]:checked');

    if (selectedOption) {
      e.target.innerText = "Voted ✔";
      e.target.disabled = true;
      e.target.style.background = "#9ca3af";
      alert(`Vote registered for: ${selectedOption.value}`);
    } else {
      alert("Please select an option before voting!");
    }
  };

  // --- HANDLE REVIEW SUBMIT ---
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const newReview = { 
      author: form.author.value, 
      text: form.text.value, 
      optionName: form.option.value 
    };

    // Optimistic Update
    const currentReviews = Array.isArray(reviews) ? {} : { ...reviews };
    if (!currentReviews[newReview.optionName]) {
        currentReviews[newReview.optionName] = [];
    }
    currentReviews[newReview.optionName].push(newReview);
    setReviews(currentReviews);

    // Send to Server
    fetch('/add-review', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
    }).catch(err => console.error("Server error:", err));

    form.reset();
    setIsModalOpen(false);
    alert("Review Added!");
  };

  // Flatten reviews for display
  const flatReviews = Array.isArray(reviews) ? reviews : Object.values(reviews).flat();

  return (
    <>
      {/* use your team's navbar component (no changes to it) */}
      <MainNavbar />

      {/* MAIN LAYOUT */}
      <div className="main"> 
      
        <div className="main-content-wrapper">

          {/* HAMBURGER MENU (Always Visible Now) */}
          <nav className="hamburger-menu" id="hamburgerMenu"> 
            <div className="menu-header"> 
              <i className="fas fa-bars"></i> 
              <span>Voting Menu</span> 
            </div> 
            {/* REMOVED: style={{ display: ... }} so it is always shown */}
            <div className="hamburger-links"> 
              <a href="#fav-place-domain" className="hamburger-link"><i className="fas fa-map-marker-alt"></i><span>Fav Place</span></a> 
              <a href="#hangout-domain" className="hamburger-link"><i className="fas fa-users"></i><span>Hangout</span></a> 
              <a href="#food-domain" className="hamburger-link"><i className="fas fa-utensils"></i><span>Food</span></a> 
              <a href="#events-domain" className="hamburger-link"><i className="fas fa-calendar-alt"></i><span>Events</span></a> 
              <a href="#clubs-domain" className="hamburger-link"><i className="fas fa-music"></i><span>Clubs</span></a> 
              <a href="#sports-domain" className="hamburger-link"><i className="fas fa-futbol"></i><span>Sports</span></a> 
              <a href="#library-domain" className="hamburger-link"><i className="fas fa-book"></i><span>Library</span></a> 
              <a href="#hostel-domain" className="hamburger-link"><i className="fas fa-bed"></i><span>Hostel</span></a> 
              <a href="#memories-domain" className="hamburger-link"><i className="fas fa-star"></i><span>Memories</span></a> 
            </div> 
          </nav> 

          {/* QUESTIONS GRID */}
          <div className="questions-grid"> 
            
            {/* Domain: Favorite Place */}
            <div className="domain-section" id="fav-place-domain" style={{ marginTop: '0.5rem' }}> 
              <div className="domain-title">Favorite Place</div> 
              <div className="domain-cards"> 
                <div className="card"> 
                  <h3>What is your most favorite place to visit in Chitkara University?</h3> 
                  <div className="options"> 
                    <label><input type="radio" name="q1" value="Square 1" /> Square 1</label> 
                    <label><input type="radio" name="q1" value="Library" /> Library</label> 
                    <label><input type="radio" name="q1" value="Sportorium" /> Sportorium</label> 
                    <label><input type="radio" name="q1" value="Other" /> Other</label> 
                  </div> 
                  <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                </div> 
                <div className="card"> 
                  <h3>Which is the most photogenic spot on campus?</h3> 
                  <div className="options"> 
                    <label><input type="radio" name="q2" value="Alpha Zone" /> Alpha Zone</label> 
                    <label><input type="radio" name="q2" value="Hostel Road" /> Hostel Road</label> 
                    <label><input type="radio" name="q2" value="Exploretorium" /> Exploretorium</label> 
                    <label><input type="radio" name="q2" value="Other" /> Other</label> 
                  </div> 
                  <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                </div> 
                <div className="card"> 
                  <h3>Where do you go for peace and quiet?</h3> 
                  <div className="options"> 
                    <label><input type="radio" name="q3" value="Library" /> Library</label> 
                    <label><input type="radio" name="q3" value="Alpha Zone" /> Alpha Zone</label> 
                    <label><input type="radio" name="q3" value="Temple" /> Temple</label> 
                    <label><input type="radio" name="q3" value="Hostel Room" /> Hostel Room</label> 
                  </div> 
                  <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                </div> 
                <div className="card"> 
                  <h3>Where do you go for studies?</h3> 
                  <div className="options"> 
                    <label><input type="radio" name="q3_studies" value="Library" /> Library</label> 
                    <label><input type="radio" name="q3_studies" value="Alpha Zone" /> Alpha Zone</label> 
                    <label><input type="radio" name="q3_studies" value="Temple" /> Temple</label> 
                    <label><input type="radio" name="q3_studies" value="Hostel Room" /> Hostel Room</label> 
                  </div> 
                  <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                </div>
                <div className="card">
                  <h3>Where do you attend classes?</h3>
                  <div className="options">
                    <label><input type="radio" name ="q4_classes" value="Turing" />Turing</label>
                    <label><input type="radio" name ="q4_classes" value="Pythagoras" />Pythagoras</label>
                    <label><input type="radio" name ="q4_classes" value="Fleming" />Fleming</label>
                    <label><input type="radio" name ="q4_classes" value="Tesla" />Tesla</label>
                  </div>
                  <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                </div> 
              </div> 
            </div> 
            
            {/* Domain: Hangout */}
            <div className="domain-section" id="hangout-domain"> 
              <div className="domain-title">Hangout</div> 
              <div className="domain-cards"> 
                <div className="card"> 
                  <h3>Favorite place to hangout with friends?</h3> 
                  <div className="options"> 
                    <label><input type="radio" name="q4" value="Subway" /> Subway</label> 
                    <label><input type="radio" name="q4" value="Square 1" /> Square 1 </label> 
                    <label><input type="radio" name="q4" value="Hostel Common Room" /> Hostel Common Room</label> 
                    <label><input type="radio" name="q4" value="Other" /> Other</label> 
                  </div> 
                  <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                </div> 
                <div className="card"> 
                  <h3>Where do you spend most of your free time?</h3> 
                  <div className="options"> 
                    <label><input type="radio" name="q5" value="Hostel" /> Hostel</label> 
                    <label><input type="radio" name="q5" value="Square 1" /> Square 1</label> 
                    <label><input type="radio" name="q5" value="Library" /> Library</label> 
                    <label><input type="radio" name="q5" value="Sports Ground" /> Sports Ground</label> 
                  </div> 
                  <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                </div> 
                <div className="card"> 
                  <h3>Best place for group study?</h3> 
                  <div className="options"> 
                    <label><input type="radio" name="q6" value="Library" /> Library</label> 
                    <label><input type="radio" name="q6" value="Hostel Room" /> Hostel Room</label> 
                    <label><input type="radio" name="q6" value="Square 1" /> Square 1</label> 
                    <label><input type="radio" name="q6" value="CSE Block" /> CSE Block</label> 
                  </div> 
                  <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                </div> 
              </div> 
            </div> 
            
            {/* Domain: Food */}
            <div className="domain-section" id="food-domain"> 
              <div className="domain-title">Food</div> 
              <div className="domain-cards"> 
                <div className="card"> 
                  <h3>Best food spot on campus?</h3> 
                  <div className="options"> 
                    <label><input type="radio" name="q7" value="Square 1" /> Square 1</label> 
                    <label><input type="radio" name="q7" value="Square 2" /> Square 2</label> 
                    <label><input type="radio" name="q7" value="Subway" /> Subway </label> 
                    <label><input type="radio" name="q7" value="First Coffee" /> First Coffee</label> 
                  </div> 
                  <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                </div> 
                <div className="card"> 
                  <h3>Favorite snack at Chitkara?</h3> 
                  <div className="options"> 
                    <label><input type="radio" name="q8" value="Maggi" /> Maggi</label> 
                    <label><input type="radio" name="q8" value="Sandwich" /> Sandwich</label> 
                    <label><input type="radio" name="q8" value="Chaat" /> Chaat</label> 
                    <label><input type="radio" name="q8" value="Pasta" /> Pasta</label> 
                  </div> 
                  <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                </div> 
                <div className="card">
                   <h3>Where do you get the best coffee?</h3> 
                   <div className="options">
                     <label><input type="radio" name="q9" value="Dohful" /> Dohful</label>
                     <label><input type="radio" name="q9" value="Chai Nagri" /> Chai Nagri</label>
                     <label><input type="radio" name="q9" value="First Coffee" /> First Coffee</label>
                     <label><input type="radio" name="q9" value="Hostel Mess" /> Hostel Mess</label>
                   </div>
                   <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                </div> 
              </div> 
            </div>
            
             {/* Domain: Events */}
             <div className="domain-section" id="events-domain">
                 <div className="domain-title">Events</div> 
                 <div className="domain-cards"> 
                    <div className="card"> 
                        <h3>Which event do you enjoy the most?</h3> 
                        <div className="options"> 
                            <label><input type="radio" name="q10" value="Freshers'" /> Freshers'</label> 
                            <label><input type="radio" name="q10" value="Rangrezz" /> Rangrezz</label> 
                            <label><input type="radio" name="q10" value="Sports Fest" /> Sports Fest</label> 
                            <label><input type="radio" name="q10" value="Other" /> Other</label> 
                        </div> 
                        <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                    </div>
                    <div className="card"> 
                        <h3>Which event has the best food stalls?</h3> 
                        <div className="options"> 
                            <label><input type="radio" name="q11" value="Rangrezz" /> Rangrezz</label> 
                            <label><input type="radio" name="q11" value="Sports Fest" /> Sports Fest</label> 
                            <label><input type="radio" name="q11" value="Hostel Night" /> Hostel Night</label>
                             <label><input type="radio" name="q11" value="Other" /> Other</label>
                         </div> 
                         <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                    </div> 
                    <div className="card">
                        <h3>Which event do you participate in the most?</h3> 
                        <div className="options">
                             <label><input type="radio" name="q12" value="Sports Fest" /> Sports Fest</label> 
                             <label><input type="radio" name="q12" value="Freshers'" /> Freshers'</label>
                              <label><input type="radio" name="q12" value="Hostel Night" /> Hostel Night</label> 
                              <label><input type="radio" name="q12" value="None" /> None</label> 
                        </div> 
                        <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                    </div> 
                </div> 
            </div>
            
           {/* Domain: Clubs */}
           <div className="domain-section" id="clubs-domain"> 
                <div className="domain-title">Clubs</div>
                 <div className="domain-cards"> 
                    <div className="card">
                         <h3>Which club is your favorite?</h3> 
                         <div className="options"> 
                            <label><input type="radio" name="q13" value="Music Club" /> Music Club</label> 
                            <label><input type="radio" name="q13" value="Dance Club" /> Dance Club</label>
                             <label><input type="radio" name="q13" value="Coding Club" /> Coding Club</label>
                              <label><input type="radio" name="q13" value="Drama Club" /> Drama Club</label>
                         </div>
                         <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div>
                    <div className="card"> 
                        <h3>Which club organizes the best events?</h3>
                         <div className="options"> 
                            <label><input type="radio" name="q14" value="Music Club" /> Music Club</label> 
                            <label><input type="radio" name="q14" value="Dance Club" /> Dance Club</label> 
                            <label><input type="radio" name="q14" value="Coding Club" /> Coding Club</label>
                             <label><input type="radio" name="q14" value="Drama Club" /> Drama Club</label>
                         </div> 
                        <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div> 
                    <div className="card"> 
                        <h3>Which club would you like to join?</h3> 
                        <div className="options"> 
                            <label><input type="radio" name="q15" value="Music Club" /> Music Club</label> 
                            <label><input type="radio" name="q15" value="Dance Club" /> Dance Club</label> 
                            <label><input type="radio" name="q15" value="Coding Club" /> Coding Club</label>
                             <label><input type="radio" name="q15" value="Drama Club" /> Drama Club</label> 
                        </div> 
                        <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                    </div> 
                </div> 
            </div>
            
             {/* Domain: Sports */}
             <div className="domain-section" id="sports-domain">
                 <div className="domain-title">Sports</div> 
                 <div className="domain-cards"> 
                      <div className="card"> 
                        <h3>Favorite sport to play at Chitkara?</h3> 
                        <div className="options"> 
                            <label><input type="radio" name="q16" value="Football" /> Football</label>
                             <label><input type="radio" name="q16" value="Basketball" /> Basketball</label>
                              <label><input type="radio" name="q16" value="Cricket" /> Cricket</label> 
                              <label><input type="radio" name="q16" value="Badminton" /> Badminton</label> 
                        </div> 
                        <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                      </div> 
                      <div className="card"> 
                          <h3>Which sport do you watch the most?</h3>
                          <div className="options"> 
                            <label><input type="radio" name="q17" value="Football" /> Football</label> 
                            <label><input type="radio" name="q17" value="Basketball" /> Basketball</label> 
                            <label><input type="radio" name="q17" value="Cricket" /> Cricket</label> 
                            <label><input type="radio" name="q17" value="Volleyball" /> Volleyball</label>
                          </div> 
                          <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                      </div>
                       <div className="card">
                          <h3>Which sport would you like to see more events for?</h3> 
                          <div className="options"> 
                             <label><input type="radio" name="q18" value="Football" /> Football</label> 
                             <label><input type="radio" name="q18" value="Basketball" /> Basketball</label> 
                             <label><input type="radio" name="q18" value="Cricket" /> Cricket</label> 
                             <label><input type="radio" name="q18" value="Pickleball" /> Pickleball</label>
                          </div>
                          <button className="submit-btn" onClick={handleVote}>Submit Vote</button>
                       </div>
                 </div> 
               </div> 
               
               {/* Domain: Library */}
               <div className="domain-section" id="library-domain">
                  <div className="domain-title">Library</div>
                   <div className="domain-cards"> 
                    <div className="card"> 
                      <h3>How often do you visit the library?</h3> 
                      <div className="options"> 
                        <label><input type="radio" name="q19" value="Daily" />Daily</label>
                         <label><input type="radio" name="q19" value="Weekly" /> Weekly</label>
                          <label><input type="radio" name="q19" value="Rarely" /> Rarely</label>
                           <label><input type="radio" name="q19" value="Never" /> Never</label>
                       </div>                             
                       <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                    </div> 
                    <div className="card"> 
                        <h3>Favorite spot in the library?</h3> 
                        <div className="options"> 
                            <label><input type="radio" name="q20" value="Reading Room" /> Reading Room</label> 
                            <label><input type="radio" name="q20" value="Computer Section" /> Computer Section</label> 
                            <label><input type="radio" name="q20" value="Group Study Area" /> Group Study Area</label> 
                            <label><input type="radio" name="q20" value="Stacks" /> Stacks</label> 
                        </div> 
                        <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                    </div> 
                    <div className="card"> 
                        <h3>What do you use the library for most?</h3> 
                        <div className="options"> 
                            <label><input type="radio" name="q21" value="Study" /> Study</label> 
                            <label><input type="radio" name="q21" value="Group Work" /> Group Work</label> 
                            <label><input type="radio" name="q21" value="Research" /> Research</label> 
                            <label><input type="radio" name="q21" value="Reading Novels" /> Reading Novels</label> 
                        </div> 
                        <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                    </div> 
                  </div> 
               </div> 
               
               {/* Domain: Hostel */}
               <div className="domain-section" id="hostel-domain"> 
                    <div className="domain-title">Hostel</div> 
                    <div className="domain-cards"> 
                        <div className="card"> 
                           <h3>Best thing about hostel life?</h3> 
                           <div className="options"> 
                               <label><input type="radio" name="q22" value="Friends" /> Friends</label> 
                               <label><input type="radio" name="q22" value="Food" /> Food</label> 
                               <label><input type="radio" name="q22" value="Freedom" /> Freedom</label> 
                               <label><input type="radio" name="q22" value="Events" /> Events</label> 
                            </div> 
                           <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                        </div> 
                       <div className="card"> 
                           <h3>What do you miss most about hostel during holidays?</h3> 
                           <div className="options"> 
                               <label><input type="radio" name="q23" value="Friends" /> Friends</label> 
                               <label><input type="radio" name="q23" value="Hostel Food" /> Hostel Food</label> 
                               <label><input type="radio" name="q23" value="Hostel Events" /> Hostel Events</label> 
                               <label><input type="radio" name="q23" value="Nothing" /> Nothing</label> 
                            </div> 
                           <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                        </div> 
                       <div className="card"> 
                           <h3>Favorite hostel event?</h3> 
                           <div className="options"> 
                               <label><input type="radio" name="q24" value="Hostel Night" /> Hostel Night</label> 
                               <label><input type="radio" name="q24" value="DJ Night" /> DJ Night</label> 
                               <label><input type="radio" name="q24" value="Sports" /> Sports</label> 
                               <label><input type="radio" name="q24" value="Other" /> Other</label> 
                            </div> 
                           <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                        </div> 
                    </div> 
                </div> 
                
               {/* Domain: Memories */}
               <div className="domain-section" id="memories-domain"> 
                    <div className="domain-title">Memories</div> 
                    <div className="domain-cards"> 
                        <div className="card"> 
                            <h3>Your most memorable moment at Chitkara?</h3> 
                            <div className="options"> 
                                <label><input type="radio" name="q25" value="First Day" /> First Day</label> 
                                <label><input type="radio" name="q25" value="Fests" /> Fests</label> 
                                <label><input type="radio" name="q25" value="Hostel Nights" /> Hostel Nights</label> 
                                <label><input type="radio" name="q25" value="Other" /> Other</label> 
                            </div> 
                            <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                        </div> 
                        <div className="card"> 
                            <h3>Best memory with friends?</h3> 
                            <div className="options"> 
                                <label><input type="radio" name="q26" value="Group Study" /> Group Study</label> 
                                <label><input type="radio" name="q26" value="Night Outs" /> Night Outs</label> 
                                <label><input type="radio" name="q26" value="Hostel Fun" /> Hostel Fun</label> 
                                <label><input type="radio" name="q26" value="Trips" /> Trips</label> 
                            </div> 
                            <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                        </div> 
                        <div className="card"> 
                            <h3>Which moment would you relive?</h3> 
                            <div className="options"> 
                                <label><input type="radio" name="q27" value="First Day" /> First Day</label> 
                                <label><input type="radio" name="q27" value="Fests" /> Fests</label> 
                                <label><input type="radio" name="q27" value="Hostel Nights" /> Hostel Nights</label> 
                                <label><input type="radio" name="q27" value="Other" /> Other</label> 
                            </div> 
                            <button className="submit-btn" onClick={handleVote}>Submit Vote</button> 
                        </div> 
                    </div> 
                </div> 

          </div> 
        </div> 
        
        {/* REVIEW PANEL - This is inside .main so it sits next to content */}
        <aside className="review-panel" id="reviewPanel">
            <div className="review-header">
                <h3><i className="fas fa-comments"></i> Recent Reviews</h3>
                <button className="add-review-btn-header" onClick={toggleModal}>
                    <i className="fas fa-plus"></i> Add Review
                </button>
            </div>
            <div className="review-content">
                {flatReviews.length === 0 ? (
                    <p className="no-reviews">No reviews yet. Be the first!</p>
                ) : (
                    flatReviews.map((rev, index) => (
                        <div key={index} className="review-card">
                            <p className="review-text">"{rev.text}"</p>
                            <span className="review-option">Re: <strong>{rev.optionName}</strong></span>
                            <span className="review-author">- {rev.author}</span>
                        </div>
                    ))
                )}
            </div>
        </aside>
      </div>
      {/* END MAIN LAYOUT */}

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay active">
            <div className="modal-box">
                <div className="modal-header">
                    <h3>Write a Review</h3>
                    <button className="modal-close-btn" onClick={toggleModal}>&times;</button>
                </div>
                <div className="modal-content">
                    <form onSubmit={handleReviewSubmit}>
                        <div className="form-group">
                            <label htmlFor="reviewAuthor">Your Name:</label>
                            <input type="text" id="reviewAuthor" name="author" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reviewOptionSelect">Which option are you reviewing?</label>
                            <select id="reviewOptionSelect" name="option" required>
                                <option value="Square 1">Square 1</option>
                                <option value="Library">Library</option>
                                <option value="Hostel">Hostel</option>
                                <option value="Sports">Sports</option>
                                <option value="Dohful">Dohful</option>
                                <option value="Maggi">Maggi</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="reviewText">Your Review:</label>
                            <textarea id="reviewText" name="text" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="submit-btn modal-submit-btn">Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
      )}
    </>
  )
}

export default VotingPg;
