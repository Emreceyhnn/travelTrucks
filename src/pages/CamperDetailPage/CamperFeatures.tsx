import type { Camper } from '../../lib/type/camper';
import { Box, Typography, Divider, Table, TableBody, TableRow, TableCell } from '@mui/material';
import sprite from '../../assets/sprite.svg';
interface CamperFeaturesProps {
    camper: Camper;
}

const CamperFeatures: React.FC<CamperFeaturesProps> = ({ camper }) => {
    const equipmentItems: { label: string; available: boolean; icon: string; stroke?: boolean }[] = [
        { label: camper.transmission === 'automatic' ? 'Automatic' : 'Manual', available: true, icon: 'icon-diagram' },
        { label: 'AC', available: camper.AC, icon: 'icon-wind' },
        { label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1), available: true, icon: 'icon-fuel' },
        { label: 'Kitchen', available: camper.kitchen, icon: 'icon-cup-hot' },
        { label: 'TV', available: camper.TV, icon: 'icon-tv' },
        { label: 'Bathroom', available: camper.bathroom, icon: 'icon-ph_shower' },
        { label: 'Radio', available: camper.radio, icon: 'icon-radio' },
        { label: 'Refrigerator', available: camper.refrigerator, icon: 'icon-solar_fridge-outline' },
        { label: 'Microwave', available: camper.microwave, icon: 'icon-lucide_microwave', stroke: true },
        { label: 'Gas', available: camper.gas, icon: 'icon-hugeicons_gas-stove', stroke: true },
        { label: 'Water', available: camper.water, icon: 'icon-ion_water-outline', stroke: true },
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
                            display: 'flex', alignItems: 'center', gap: '8px', py: '15px', px: '21px',
                            bgcolor: '#F2F4F7', borderRadius: '100px', fontSize: '16px', fontWeight: 500, color: '#101828',
                            textTransform: 'capitalize'
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            fill={item.stroke ? 'none' : 'currentColor'}
                            stroke={item.stroke ? 'currentColor' : 'none'}
                        >
                            <use href={`${sprite}#${item.icon}`} />
                        </svg>
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
