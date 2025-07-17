// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const ProfileSetup = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     age: '',
//     height: '',
//     weight: '',
//     gender: '',
//     fitnessLevel: '',
//     goals: [],
//     activityLevel: '',
//     workoutPreferences: [],
//     medicalConditions: []
//   });

//   const totalSteps = 4;

//   const fitnessLevels = [
//     { value: 'beginner', label: 'Débutant', desc: 'Nouveau dans le fitness' },
//     { value: 'intermediate', label: 'Intermédiaire', desc: 'Quelques mois d\'expérience' },
//     { value: 'advanced', label: 'Avancé', desc: 'Plus d\'un an d\'expérience' },
//     { value: 'expert', label: 'Expert', desc: 'Plusieurs années d\'expérience' }
//   ];

//   const goals = [
//     { value: 'weight_loss', label: 'Perte de poids', icon: '📉' },
//     { value: 'muscle_gain', label: 'Gain musculaire', icon: '💪' },
//     { value: 'endurance', label: 'Endurance', icon: '❤️' },
//     { value: 'strength', label: 'Force', icon: '🎯' },
//     { value: 'flexibility', label: 'Flexibilité', icon: '🤸' },
//     { value: 'general_fitness', label: 'Forme générale', icon: '⚡' }
//   ];

//   const activityLevels = [
//     { value: 'sedentary', label: 'Sédentaire', desc: 'Peu ou pas d\'exercice' },
//     { value: 'light', label: 'Léger', desc: '1-3 jours/semaine' },
//     { value: 'moderate', label: 'Modéré', desc: '3-5 jours/semaine' },
//     { value: 'active', label: 'Actif', desc: '6-7 jours/semaine' },
//     { value: 'very_active', label: 'Très actif', desc: '2x par jour ou travail physique' }
//   ];

//   const workoutTypes = [
//     'Cardio', 'Musculation', 'Yoga', 'Pilates', 'CrossFit', 'Course', 'Natation', 'Vélo'
//   ];

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleArrayToggle = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].includes(value) 
//         ? prev[field].filter(item => item !== value)
//         : [...prev[field], value]
//     }));
//   };

//   const nextStep = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = () => {
//     console.log('Profile setup completed:', formData);
//     // Redirect to dashboard or next page
//   };

//   const renderStep1 = () => (
//     <div className="row justify-content-center">
//       <div className="col-lg-8">
//         <div className="text-center mb-5">
//           <h2 className="text-white mb-2">Informations de base</h2>
//           <p className="text-muted">Dites-nous en plus sur vous</p>
//         </div>

//         <div className="row">
//           <div className="col-md-6 mb-4">
//             <label className="form-label text-white">Âge</label>
//             <input
//               type="number"
//               className="form-control bg-dark text-white border-secondary"
//               value={formData.age}
//               onChange={(e) => handleInputChange('age', e.target.value)}
//               placeholder="25"
//             />
//           </div>

//           <div className="col-md-6 mb-4">
//             <label className="form-label text-white">Sexe</label>
//             <div className="d-flex gap-3">
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="gender"
//                   value="male"
//                   checked={formData.gender === 'male'}
//                   onChange={(e) => handleInputChange('gender', e.target.value)}
//                 />
//                 <label className="form-check-label text-white">Homme</label>
//               </div>
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="gender"
//                   value="female"
//                   checked={formData.gender === 'female'}
//                   onChange={(e) => handleInputChange('gender', e.target.value)}
//                 />
//                 <label className="form-check-label text-white">Femme</label>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6 mb-4">
//             <label className="form-label text-white">Taille (cm)</label>
//             <input
//               type="number"
//               className="form-control bg-dark text-white border-secondary"
//               value={formData.height}
//               onChange={(e) => handleInputChange('height', e.target.value)}
//               placeholder="175"
//             />
//           </div>

//           <div className="col-md-6 mb-4">
//             <label className="form-label text-white">Poids (kg)</label>
//             <input
//               type="number"
//               className="form-control bg-dark text-white border-secondary"
//               value={formData.weight}
//               onChange={(e) => handleInputChange('weight', e.target.value)}
//               placeholder="70"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="row justify-content-center">
//       <div className="col-lg-8">
//         <div className="text-center mb-5">
//           <h2 className="text-white mb-2">Niveau de fitness</h2>
//           <p className="text-muted">Sélectionnez votre niveau actuel</p>
//         </div>

//         <div className="row">
//           {fitnessLevels.map((level) => (
//             <div key={level.value} className="col-md-6 mb-3">
//               <div
//                 className={`card h-100 cursor-pointer ${
//                   formData.fitnessLevel === level.value
//                     ? 'border-primary bg-primary bg-opacity-10'
//                     : 'bg-dark border-secondary'
//                 }`}
//                 onClick={() => handleInputChange('fitnessLevel', level.value)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <div className="card-body text-center">
//                   <h5 className="card-title text-white">{level.label}</h5>
//                   <p className="card-text text-muted">{level.desc}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-4">
//           <label className="form-label text-white">Niveau d'activité actuel</label>
//           <select
//             className="form-select bg-dark text-white border-secondary"
//             value={formData.activityLevel}
//             onChange={(e) => handleInputChange('activityLevel', e.target.value)}
//           >
//             <option value="">Sélectionnez votre niveau d'activité</option>
//             {activityLevels.map((level) => (
//               <option key={level.value} value={level.value}>
//                 {level.label} - {level.desc}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep3 = () => (
//     <div className="row justify-content-center">
//       <div className="col-lg-8">
//         <div className="text-center mb-5">
//           <h2 className="text-white mb-2">Vos objectifs</h2>
//           <p className="text-muted">Que souhaitez-vous accomplir ? (Sélection multiple)</p>
//         </div>

//         <div className="row">
//           {goals.map((goal) => (
//             <div key={goal.value} className="col-md-4 mb-3">
//               <div
//                 className={`card h-100 cursor-pointer ${
//                   formData.goals.includes(goal.value)
//                     ? 'border-primary bg-primary bg-opacity-10'
//                     : 'bg-dark border-secondary'
//                 }`}
//                 onClick={() => handleArrayToggle('goals', goal.value)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <div className="card-body text-center">
//                   <div className="fs-2 mb-2">{goal.icon}</div>
//                   <h6 className="card-title text-white">{goal.label}</h6>
//                   {formData.goals.includes(goal.value) && (
//                     <div className="text-primary mt-2">
//                       <i className="bi bi-check-circle-fill"></i>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep4 = () => (
//     <div className="row justify-content-center">
//       <div className="col-lg-8">
//         <div className="text-center mb-5">
//           <h2 className="text-white mb-2">Préférences d'entraînement</h2>
//           <p className="text-muted">Quels types d'exercices vous intéressent ?</p>
//         </div>

//         <div className="mb-4">
//           <label className="form-label text-white">Types d'entraînement préférés</label>
//           <div className="row">
//             {workoutTypes.map((type) => (
//               <div key={type} className="col-md-3 mb-2">
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     value={type}
//                     checked={formData.workoutPreferences.includes(type)}
//                     onChange={() => handleArrayToggle('workoutPreferences', type)}
//                   />
//                   <label className="form-check-label text-white">{type}</label>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="form-label text-white">Conditions médicales ou limitations (optionnel)</label>
//           <textarea
//             className="form-control bg-dark text-white border-secondary"
//             rows="3"
//             placeholder="Décrivez toute condition médicale ou limitation physique..."
//             value={formData.medicalConditions}
//             onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
//           />
//         </div>

//         <div className="alert alert-info">
//           <strong>Presque terminé !</strong> Ces informations nous aideront à créer un programme d'entraînement personnalisé pour vous.
//         </div>
//       </div>
//     </div>
//   );

//   const renderProgressBar = () => (
//     <div className="mb-5">
//       <div className="d-flex justify-content-between align-items-center mb-2">
//         <span className="text-white">Étape {currentStep} sur {totalSteps}</span>
//         <span className="text-muted">{Math.round((currentStep / totalSteps) * 100)}%</span>
//       </div>
//       <div className="progress" style={{ height: '8px' }}>
//         <div
//           className="progress-bar bg-primary"
//           role="progressbar"
//           style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//         ></div>
//       </div>
//     </div>
//   );

//   const renderCurrentStep = () => {
//     switch (currentStep) {
//       case 1:
//         return renderStep1();
//       case 2:
//         return renderStep2();
//       case 3:
//         return renderStep3();
//       case 4:
//         return renderStep4();
//       default:
//         return renderStep1();
//     }
//   };

//   return (
//     <div className="min-vh-100 bg-dark">
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-lg-10">
//             <div className="text-center mb-5">
//               <h1 className="text-white mb-2">Configuration du profil</h1>
//               <p className="text-muted">Personnalisez votre expérience fitness</p>
//             </div>

//             {renderProgressBar()}

//             <div className="card bg-dark border-secondary">
//               <div className="card-body p-5">
//                 {renderCurrentStep()}

//                 <div className="d-flex justify-content-between mt-5">
//                   <button
//                     className="btn btn-outline-secondary"
//                     onClick={prevStep}
//                     disabled={currentStep === 1}
//                   >
//                     <i className="bi bi-chevron-left me-2"></i>
//                     Précédent
//                   </button>

//                   {currentStep < totalSteps ? (
//                     <button
//                       className="btn btn-primary"
//                       onClick={nextStep}
//                     >
//                       Suivant
//                       <i className="bi bi-chevron-right ms-2"></i>
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-success"
//                       onClick={handleSubmit}
//                     >
//                       Terminer la configuration
//                       <i className="bi bi-check-circle ms-2"></i>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .cursor-pointer {
//           cursor: pointer;
//         }
//         .form-control:focus,
//         .form-select:focus {
//           background-color: #343a40;
//           border-color: #0d6efd;
//           color: white;
//         }
//         .form-check-input:checked {
//           background-color: #0d6efd;
//           border-color: #0d6efd;
//         }
//         .card:hover {
//           transform: translateY(-2px);
//           transition: transform 0.2s ease;
//         }
//         .min-vh-100 {
//           min-height: 100vh;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProfileSetup;
const renderStep3 = () => (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="text-center mb-5">
          <h2 className="step-title">Vos objectifs</h2>
          <p className="step-subtitle">Que souhaitez-vous accomplir ? (Sélection multiple)</p>
           </div>
           
        </div>

        <div className="row">
          {goals.map((goal) => (
            <div key={goal.value} className="col-md-4 mb-3">
              <div
                className={`selection-card ${
                  formData.goals.includes(goal.value) ? 'selected' : ''
                }`}
                onClick={() => (handleArrayToggleimport React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfileSetup.css';

const ProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: '',
    fitnessLevel: '',
    goals: [],
    activityLevel: '',
    workoutPreferences: [],
    medicalConditions: []
  });

  const totalSteps = 4;

  const fitnessLevels = [
    { value: 'beginner', label: 'Débutant', desc: 'Nouveau dans le fitness' },
    { value: 'intermediate', label: 'Intermédiaire', desc: 'Quelques mois d\'expérience' },
    { value: 'advanced', label: 'Avancé', desc: 'Plus d\'un an d\'expérience' },
    { value: 'expert', label: 'Expert', desc: 'Plusieurs années d\'expérience' }
  ];

  const goals = [
    { value: 'weight_loss', label: 'Perte de poids', icon: '📉' },
    { value: 'muscle_gain', label: 'Gain musculaire', icon: '💪' },
    { value: 'endurance', label: 'Endurance', icon: '❤️' },
    { value: 'strength', label: 'Force', icon: '🎯' },
    { value: 'flexibility', label: 'Flexibilité', icon: '🤸' },
    { value: 'general_fitness', label: 'Forme générale', icon: '⚡' }
  ];

  const activityLevels = [
    { value: 'sedentary', label: 'Sédentaire', desc: 'Peu ou pas d\'exercice' },
    { value: 'light', label: 'Léger', desc: '1-3 jours/semaine' },
    { value: 'moderate', label: 'Modéré', desc: '3-5 jours/semaine' },
    { value: 'active', label: 'Actif', desc: '6-7 jours/semaine' },
    { value: 'very_active', label: 'Très actif', desc: '2x par jour ou travail physique' }
  ];

  const workoutTypes = [
    'Cardio', 'Musculation', 'Yoga', 'Pilates', 'CrossFit', 'Course', 'Natation', 'Vélo'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Profile setup completed:', formData);
    // Redirect to dashboard or next page
  };

  const renderStep1 = () => (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="text-center mb-5">
          <h2 className="step-title">Informations de base</h2>
          <p className="step-subtitle">Dites-nous en plus sur vous</p>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <label className="form-label-custom">Âge</label>
            <input
              type="number"
              className="form-control form-control-custom"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="25"
            />
          </div>

          <div className="col-md-6 mb-4">
            <label className="form-label-custom">Sexe</label>
            <div className="d-flex gap-3">
              <div className="form-check-custom">
                <input
                  className="form-check-input form-check-input-custom"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                />
                <label className="form-check-label-custom">Homme</label>
              </div>
              <div className="form-check-custom">
                <input
                  className="form-check-input form-check-input-custom"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                />
                <label className="form-check-label-custom">Femme</label>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <label className="form-label-custom">Taille (cm)</label>
            <input
              type="number"
              className="form-control form-control-custom"
              value={formData.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              placeholder="175"
            />
          </div>

          <div className="col-md-6 mb-4">
            <label className="form-label-custom">Poids (kg)</label>
            <input
              type="number"
              className="form-control form-control-custom"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              placeholder="70"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="text-center mb-5">
          <h2 className="step-title">Niveau de fitness</h2>
          <p className="step-subtitle">Sélectionnez votre niveau actuel</p>
        </div>

        <div className="row">
          {fitnessLevels.map((level) => (
            <div key={level.value} className="col-md-6 mb-3">
              <div
                className={`selection-card ${
                  formData.fitnessLevel === level.value ? 'selected' : ''
                }`}
                onClick={() => handleInputChange('fitnessLevel', level.value)}
              >
                <div className="selection-indicator">
                  <i className="bi bi-check"></i>
                </div>
                <h5 className="selection-card-title">{level.label}</h5>
                <p className="selection-card-description">{level.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className="form-label-custom">Niveau d'activité actuel</label>
          <select
            className="form-select form-select-custom"
            value={formData.activityLevel}
            onChange={(e) => handleInputChange('activityLevel', e.target.value)}
          >
            <option value="">Sélectionnez votre niveau d'activité</option>
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label} - {level.desc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="text-center mb-5">
          <h2 className="text-white mb-2">Vos objectifs</h2>
          <p className="text-muted">Que souhaitez-vous accomplir ? (Sélection multiple)</p>
        </div>

        <div className="row">
          {goals.map((goal) => (
            <div key={goal.value} className="col-md-4 mb-3">
              <div
                className={`card h-100 cursor-pointer ${
                  formData.goals.includes(goal.value)
                    ? 'border-primary bg-primary bg-opacity-10'
                    : 'bg-dark border-secondary'
                }`}
                onClick={() => handleArrayToggle('goals', goal.value)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body text-center">
                  <div className="fs-2 mb-2">{goal.icon}</div>
                  <h6 className="card-title text-white">{goal.label}</h6>
                  {formData.goals.includes(goal.value) && (
                    <div className="text-primary mt-2">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="text-center mb-5">
          <h2 className="text-white mb-2">Préférences d'entraînement</h2>
          <p className="text-muted">Quels types d'exercices vous intéressent ?</p>
        </div>

        <div className="mb-4">
          <label className="form-label text-white">Types d'entraînement préférés</label>
          <div className="row">
            {workoutTypes.map((type) => (
              <div key={type} className="col-md-3 mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={type}
                    checked={formData.workoutPreferences.includes(type)}
                    onChange={() => handleArrayToggle('workoutPreferences', type)}
                  />
                  <label className="form-check-label text-white">{type}</label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label text-white">Conditions médicales ou limitations (optionnel)</label>
          <textarea
            className="form-control bg-dark text-white border-secondary"
            rows="3"
            placeholder="Décrivez toute condition médicale ou limitation physique..."
            value={formData.medicalConditions}
            onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
          />
        </div>

        <div className="alert alert-info">
          <strong>Presque terminé !</strong> Ces informations nous aideront à créer un programme d'entraînement personnalisé pour vous.
        </div>
      </div>
    </div>
  );

  const renderProgressBar = () => (
    <div className="mb-5">
      <div className="progress-info">
        <span className="progress-text">Étape {currentStep} sur {totalSteps}</span>
        <span className="progress-percentage">{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>
      <div className="progress-custom">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h1 className="profile-setup-title">Configuration du profil</h1>
              <p className="profile-setup-subtitle">Personnalisez votre expérience fitness</p>
            </div>

            {renderProgressBar()}

            <div className="setup-card fade-in">
              {renderCurrentStep()}

              <div className="step-navigation">
                <button
                  className="btn-custom btn-outline-custom"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <i className="bi bi-chevron-left"></i>
                  Précédent
                </button>

                {currentStep < totalSteps ? (
                  <button
                    className="btn-custom btn-primary-custom"
                    onClick={nextStep}
                  >
                    Suivant
                    <i className="bi bi-chevron-right"></i>
                  </button>
                ) : (
                  <button
                    className="btn-custom btn-success-custom"
                    onClick={handleSubmit}
                  >
                    Terminer la configuration
                    <i className="bi bi-check-circle"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;