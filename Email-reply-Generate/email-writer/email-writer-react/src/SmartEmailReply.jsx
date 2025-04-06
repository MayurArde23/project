// src/SmartEmailReply.jsx
import { useState } from 'react';
import {
  Box, Button, CircularProgress, Container, FormControl,
  InputLabel, MenuItem, Select, TextField, Typography
} from '@mui/material';
import axios from 'axios';

const SmartEmailReply = () => {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom>Email Reply Generator</Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        label="Original Email Content"
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tone (Optional)</InputLabel>
        <Select value={tone} onChange={(e) => setTone(e.target.value)}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
          <MenuItem value="casual">Casual</MenuItem>
          <MenuItem value="friendly">Friendly</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" fullWidth onClick={handleSubmit} disabled={!emailContent || loading}>
        {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
      </Button>

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      {generatedReply && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>Generated Reply:</Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={generatedReply}
            inputProps={{ readOnly: true }}
          />
          <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigator.clipboard.writeText(generatedReply)}>
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default SmartEmailReply;
