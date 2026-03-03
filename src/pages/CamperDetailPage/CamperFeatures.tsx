import type { Camper } from '../../lib/type/camper';
import { Box, Typography, Divider, Table, TableBody, TableRow, TableCell } from '@mui/material';

interface CamperFeaturesProps {
    camper: Camper;
}

const CamperFeatures: React.FC<CamperFeaturesProps> = ({ camper }) => {
    const equipmentItems: { label: string; available: boolean }[] = [
        { label: camper.transmission === 'automatic' ? 'Automatic' : 'Manual', available: true },
        { label: 'AC', available: camper.AC },
        { label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1), available: true },
        { label: 'Kitchen', available: camper.kitchen },
        { label: 'TV', available: camper.TV },
        { label: 'Bathroom', available: camper.bathroom },
        { label: 'Radio', available: camper.radio },
        { label: 'Refrigerator', available: camper.refrigerator },
        { label: 'Microwave', available: camper.microwave },
        { label: 'Gas', available: camper.gas },
        { label: 'Water', available: camper.water },
    ];

    const activeEquipment = equipmentItems.filter((item) => item.available);

    const formLabels: Record<string, string> = {
        alcove: 'Alcove',
        fullyIntegrated: 'Fully Integrated',
        panelTruck: 'Panel Truck',
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {activeEquipment.map((item) => (
                    <Box
                        key={item.label}
                        sx={{
                            display: 'flex', alignItems: 'center', gap: '8px', py: '12px', px: '18px',
                            bgcolor: 'grey.100', borderRadius: '200px', fontSize: '14px', fontWeight: 500, color: 'text.primary'
                        }}
                    >
                        {item.label}
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h3" sx={{ fontSize: '20px', fontWeight: 600, color: 'text.primary', mb: '12px' }}>
                    Vehicle details
                </Typography>
                <Divider sx={{ mb: '24px' }} />
                <Table sx={{ width: '100%', borderCollapse: 'collapse' }}>
                    <TableBody>
                        {[
                            { label: 'Form', value: formLabels[camper.form] || camper.form },
                            { label: 'Length', value: camper.length },
                            { label: 'Width', value: camper.width },
                            { label: 'Height', value: camper.height },
                            { label: 'Tank', value: camper.tank },
                            { label: 'Consumption', value: camper.consumption },
                        ].map((row, index) => (
                            <TableRow key={index} sx={{ borderBottom: index !== 5 ? '1px solid #f2f4f7' : 'none' }}>
                                <TableCell sx={{ p: '8px 0', border: 'none', fontSize: '16px', color: 'text.primary', fontWeight: 400 }}>
                                    {row.label}
                                </TableCell>
                                <TableCell sx={{ p: '8px 0', border: 'none', fontSize: '16px', color: 'text.primary', fontWeight: 500, textAlign: 'right' }}>
                                    {row.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default CamperFeatures;
